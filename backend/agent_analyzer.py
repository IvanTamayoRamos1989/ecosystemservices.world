import json
import logging
import os
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
from google.generativeai import types as genai_types
from google.api_core import exceptions as google_exceptions


load_dotenv()


def _configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )


_configure_logging()
logger = logging.getLogger("agent_analyzer")


def _get_api_key() -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY is not set in the environment.")
        raise RuntimeError("Server configuration error: missing GEMINI_API_KEY.")
    return api_key


def _configure_genai(api_key: str) -> None:
    genai.configure(api_key=api_key)


def _build_search_model() -> genai.GenerativeModel:
    return genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        tools=[{"google_search": {}}],
        safety_settings={
            "HARASSMENT": "BLOCK_MEDIUM_AND_ABOVE",
            "HATE": "BLOCK_MEDIUM_AND_ABOVE",
            "SEXUAL": "BLOCK_MEDIUM_AND_ABOVE",
            "DANGEROUS": "BLOCK_MEDIUM_AND_ABOVE",
        },
    )


def _build_extraction_model(full_schema: Dict[str, Any]) -> genai.GenerativeModel:
    generation_config = genai_types.GenerationConfig(
        response_mime_type="application/json",
        response_schema=full_schema,
        temperature=0.2,
    )
    return genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config,
        safety_settings={
            "HARASSMENT": "BLOCK_MEDIUM_AND_ABOVE",
            "HATE": "BLOCK_MEDIUM_AND_ABOVE",
            "SEXUAL": "BLOCK_MEDIUM_AND_ABOVE",
            "DANGEROUS": "BLOCK_MEDIUM_AND_ABOVE",
        },
    )


SOLUTION_SCHEMA: Dict[str, Any] = {
    "type": "OBJECT",
    "properties": {
        "solutionName": {"type": "STRING"},
        "category": {"type": "STRING"},
        "location": {"type": "STRING"},
        "completionDate": {"type": "STRING"},
        "engineeringSpecifications": {
            "type": "OBJECT",
            "properties": {
                "technicalDescription": {"type": "STRING"},
                "designParameters": {"type": "STRING"},
                "performance": {"type": "STRING"},
                "construction": {"type": "STRING"},
                "maintenance": {"type": "STRING"},
            },
        },
        "environmentalImpact": {
            "type": "OBJECT",
            "properties": {
                "baseline": {"type": "STRING"},
                "waterQuality": {"type": "STRING"},
                "carbonImpact": {"type": "STRING"},
                "biodiversity": {"type": "STRING"},
                "certifications": {"type": "STRING"},
            },
        },
        "financialAnalysis": {
            "type": "OBJECT",
            "properties": {
                "capitalCost": {"type": "STRING"},
                "operatingCost": {"type": "STRING"},
                "financialReturns": {"type": "STRING"},
                "financingStructure": {"type": "STRING"},
            },
        },
        "socialImpact": {
            "type": "OBJECT",
            "properties": {
                "riskMitigation": {"type": "STRING"},
                "opportunityCreation": {"type": "STRING"},
                "equityAssessment": {"type": "STRING"},
            },
        },
        "implementationReplicability": {
            "type": "OBJECT",
            "properties": {
                "timeline": {"type": "STRING"},
                "stakeholders": {"type": "STRING"},
                "barriers": {"type": "STRING"},
                "successFactors": {"type": "STRING"},
                "lessonsLearned": {"type": "STRING"},
            },
        },
        "evidenceDataQuality": {
            "type": "OBJECT",
            "properties": {
                "dataCompleteness": {"type": "STRING"},
                "verification": {"type": "STRING"},
                "confidence": {"type": "STRING"},
                "sources": {"type": "STRING"},
                "dataGaps": {"type": "STRING"},
            },
        },
        "keyMetricsMetadata": {
            "type": "OBJECT",
            "properties": {
                "sustainabilityKPIs": {"type": "STRING"},
                "sdgAlignment": {"type": "STRING"},
                "innovationLevel": {"type": "STRING"},
                "trl": {"type": "STRING"},
                "replicationPotential": {"type": "STRING"},
            },
        },
    },
}

FULL_SCHEMA: Dict[str, Any] = {
    "type": "OBJECT",
    "properties": {
        "solutions": {
            "type": "ARRAY",
            "items": SOLUTION_SCHEMA,
        }
    },
}


def _build_research_prompt(company_name: str, source_url: str) -> str:
    return (
        "You are a world-class research assistant conducting a PhD-level investigation.\n"
        f'Your task is to perform a deep-dive investigation into the company or project named "{company_name}", '
        f'using the provided starting URL "{source_url}" as a primary reference point.\n'
        "Your goal is to gather comprehensive, technical-grade information about their regenerative infrastructure solutions. "
        "Use your search tools to find ESG reports, project pages, technical documentation, case studies, and financial reports.\n"
        "Synthesize your findings into a detailed, evidence-based summary. Focus on:\n"
        "- Engineering & Technical Specifications\n"
        "- Environmental Impact (quantified metrics)\n"
        "- Financial Analysis (CAPEX, OPEX, financing vehicles like green bonds)\n"
        "- Social Impact (quantified metrics, community engagement)\n"
        "- Replicability & Lessons Learned\n"
        "Return only the synthesized text. Do not add any conversational preamble."
    )


def _build_extraction_prompt(research_summary: str) -> str:
    return (
        "You are an expert team of a Civil Engineer (P.E., 15+ years), an Environmental Scientist (PhD), "
        "a Financial Analyst (CFA), and a Social Impact Officer (Expert). Your task is to extract all distinct "
        "regenerative infrastructure solutions from the provided research summary.\n"
        "SPECIAL FOCUS: Pay extremely close attention to extracting:\n"
        "- Technical Data: All quantified engineering, environmental, and social performance metrics.\n"
        "- Financial Vehicles: All mentions of financial instruments (green bonds, grants, incentives, blended finance, sustainability-linked loans), "
        "cost-benefit analyses, and economic advantages.\n"
        "- Sustainability Metrics: Explicitly identify all mentioned SDGs, sustainability KPIs, and certifications (LEED, BREEAM, etc.).\n"
        'CRITICAL CONSTRAINT: If data for any field is not available, you MUST use the string "Data not available in source".\n'
        "Here is the research summary to analyze:\n"
        f"{research_summary}"
    )


def _extract_sources_from_response(response: genai.types.GenerateContentResponse) -> List[Dict[str, Any]]:
    sources: List[Dict[str, Any]] = []
    if not response.candidates:
        return sources

    candidate = response.candidates[0]
    grounding_metadata = getattr(candidate, "grounding_metadata", None)
    if not grounding_metadata:
        return sources

    chunks = getattr(grounding_metadata, "grounding_chunks", None) or []
    unique_uris = set()
    for chunk in chunks:
        web = getattr(chunk, "web", None)
        uri = getattr(web, "uri", None) if web else None
        if uri and uri not in unique_uris:
            unique_uris.add(uri)
            title = getattr(web, "title", None) if web else None
            snippet = getattr(chunk, "text", None)
            sources.append(
                {
                    "uri": uri,
                    "title": title or "Data not available in source",
                    "snippet": snippet or "Data not available in source",
                }
            )

    return sources


def _safe_json_loads(payload: str) -> Dict[str, Any]:
    try:
        return json.loads(payload)
    except json.JSONDecodeError as exc:
        logger.error("Failed to parse JSON response from extraction step: %s", exc)
        raise


def _perform_analysis(company_name: str, source_url: str) -> Dict[str, Any]:
    research_prompt = _build_research_prompt(company_name, source_url)
    search_model = _build_search_model()

    try:
        research_response = search_model.generate_content(
            research_prompt,
            request_options={"timeout": 120},
        )
    except (google_exceptions.GoogleAPICallError, ValueError) as exc:
        logger.exception("Search step failed: %s", exc)
        raise RuntimeError("Failed to complete research step.") from exc

    research_text = research_response.text.strip() if research_response.text else ""
    if not research_text:
        raise RuntimeError("Research step returned no content.")

    sources = _extract_sources_from_response(research_response)

    extraction_prompt = _build_extraction_prompt(research_text)
    extraction_model = _build_extraction_model(FULL_SCHEMA)

    try:
        extraction_response = extraction_model.generate_content(
            extraction_prompt,
            request_options={"timeout": 120},
        )
    except (google_exceptions.GoogleAPICallError, ValueError) as exc:
        logger.exception("Extraction step failed: %s", exc)
        raise RuntimeError("Failed to complete extraction step.") from exc

    extraction_text = extraction_response.text.strip() if extraction_response.text else ""
    if not extraction_text:
        raise RuntimeError("Extraction step returned no content.")

    structured_payload = _safe_json_loads(extraction_text)
    solutions = structured_payload.get("solutions") or []

    return {"solutions": solutions, "sources": sources}


def _create_app() -> Flask:
    api_key = _get_api_key()
    _configure_genai(api_key)

    app = Flask(__name__)

    allowed_origins = os.getenv("ALLOWED_ORIGINS", "*")
    cors_kwargs: Dict[str, Any] = {
        "resources": {r"/api/*": {"origins": allowed_origins.split(",") if allowed_origins != "*" else "*"}},
        "supports_credentials": False,
    }
    CORS(app, **cors_kwargs)

    @app.route("/api/analyze", methods=["POST"])
    def analyze() -> Any:
        request_payload: Optional[Dict[str, Any]] = request.get_json(silent=True)
        if not request_payload:
            return jsonify({"error": "Invalid JSON payload."}), 400

        company_name = (request_payload.get("companyName") or "").strip()
        source_url = (request_payload.get("sourceUrl") or "").strip()

        if not company_name or not source_url:
            return jsonify({"error": "Both companyName and sourceUrl are required."}), 400

        logger.info("Received analysis request for company=%s source=%s", company_name, source_url)

        try:
            analysis_result = _perform_analysis(company_name, source_url)
        except RuntimeError as exc:
            logger.error("Analysis failed: %s", exc)
            return jsonify({"error": str(exc)}), 502
        except json.JSONDecodeError:
            return jsonify({"error": "Extraction model returned malformed data."}), 502
        except Exception as exc:  # pylint: disable=broad-except
            logger.exception("Unexpected error during analysis: %s", exc)
            return jsonify({"error": "Unexpected server error."}), 500

        response_body = {
            "solutions": analysis_result.get("solutions", []),
            "sources": analysis_result.get("sources", []),
        }
        return jsonify(response_body), 200

    return app


app = _create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
