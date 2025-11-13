import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API with key from environment variable
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")

genai.configure(api_key=GEMINI_API_KEY)

# Define the JSON schema for Step 2
solution_schema = {
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
                "maintenance": {"type": "STRING"}
            }
        },
        "environmentalImpact": {
            "type": "OBJECT",
            "properties": {
                "baseline": {"type": "STRING"},
                "waterQuality": {"type": "STRING"},
                "carbonImpact": {"type": "STRING"},
                "biodiversity": {"type": "STRING"},
                "certifications": {"type": "STRING"}
            }
        },
        "financialAnalysis": {
            "type": "OBJECT",
            "properties": {
                "capitalCost": {"type": "STRING"},
                "operatingCost": {"type": "STRING"},
                "financialReturns": {"type": "STRING"},
                "financingStructure": {"type": "STRING"}
            }
        },
        "socialImpact": {
            "type": "OBJECT",
            "properties": {
                "riskMitigation": {"type": "STRING"},
                "opportunityCreation": {"type": "STRING"},
                "equityAssessment": {"type": "STRING"}
            }
        },
        "implementationReplicability": {
            "type": "OBJECT",
            "properties": {
                "timeline": {"type": "STRING"},
                "stakeholders": {"type": "STRING"},
                "barriers": {"type": "STRING"},
                "successFactors": {"type": "STRING"},
                "lessonsLearned": {"type": "STRING"}
            }
        },
        "evidenceDataQuality": {
            "type": "OBJECT",
            "properties": {
                "dataCompleteness": {"type": "STRING"},
                "verification": {"type": "STRING"},
                "confidence": {"type": "STRING"},
                "sources": {"type": "STRING"},
                "dataGaps": {"type": "STRING"}
            }
        },
        "keyMetricsMetadata": {
            "type": "OBJECT",
            "properties": {
                "sustainabilityKPIs": {"type": "STRING"},
                "sdgAlignment": {"type": "STRING"},
                "innovationLevel": {"type": "STRING"},
                "trl": {"type": "STRING"},
                "replicationPotential": {"type": "STRING"}
            }
        }
    }
}

full_schema = {
    "type": "OBJECT",
    "properties": {
        "solutions": {
            "type": "ARRAY",
            "items": solution_schema
        }
    }
}

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        # Parse input
        data = request.get_json()
        company_name = data.get('companyName', '')
        source_url = data.get('sourceUrl', '')
        
        if not company_name or not source_url:
            return jsonify({"error": "companyName and sourceUrl are required"}), 400
        
        # Step 1: Research using gemini-1.5-flash with Google Search
        search_prompt = f"""You are a world-class research assistant conducting a PhD-level investigation.
Your task is to perform a deep-dive investigation into the company or project named "{company_name}", using the provided starting URL "{source_url}" as a primary reference point.
Your goal is to gather comprehensive, technical-grade information about their regenerative infrastructure solutions. Use your search tools to find ESG reports, project pages, technical documentation, case studies, and financial reports.
Synthesize your findings into a detailed, evidence-based summary. Focus on:
- Engineering & Technical Specifications
- Environmental Impact (quantified metrics)
- Financial Analysis (CAPEX, OPEX, financing vehicles like green bonds)
- Social Impact (quantified metrics, community engagement)
- Replicability & Lessons Learned
Return only the synthesized text. Do not add any conversational preamble."""
        
        # Initialize model with Google Search
        search_model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            tools='google_search_retrieval'
        )
        
        # Execute search and get response
        search_response = search_model.generate_content(search_prompt)
        researched_text = search_response.text
        
        # Extract grounding metadata (sources)
        sources = []
        if hasattr(search_response, 'candidates') and len(search_response.candidates) > 0:
            candidate = search_response.candidates[0]
            if hasattr(candidate, 'grounding_metadata'):
                grounding_metadata = candidate.grounding_metadata
                if hasattr(grounding_metadata, 'grounding_chunks'):
                    for chunk in grounding_metadata.grounding_chunks:
                        if hasattr(chunk, 'web') and hasattr(chunk.web, 'uri'):
                            source_entry = {
                                "uri": chunk.web.uri,
                                "title": getattr(chunk.web, 'title', 'No title available')
                            }
                            sources.append(source_entry)
        
        # Step 2: Extract structured data using gemini-1.5-pro
        extraction_prompt = f"""You are an expert team of a Civil Engineer (P.E., 15+ years), an Environmental Scientist (PhD), a Financial Analyst (CFA), and a Social Impact Officer (Expert). Your task is to extract all distinct regenerative infrastructure solutions from the provided research summary.
SPECIAL FOCUS: Pay extremely close attention to extracting:
- Technical Data: All quantified engineering, environmental, and social performance metrics.
- Financial Vehicles: All mentions of financial instruments (green bonds, grants, incentives, blended finance, sustainability-linked loans), cost-benefit analyses, and economic advantages.
- Sustainability Metrics: Explicitly identify all mentioned SDGs, sustainability KPIs, and certifications (LEED, BREEAM, etc.).
CRITICAL CONSTRAINT: If data for any field is not available, you MUST use the string "Data not available in source".
Here is the research summary to analyze:
{researched_text}"""
        
        # Initialize extraction model with JSON schema
        extraction_model = genai.GenerativeModel(
            model_name='gemini-1.5-pro',
            generation_config={
                "response_mime_type": "application/json",
                "response_schema": full_schema
            }
        )
        
        # Execute extraction
        extraction_response = extraction_model.generate_content(extraction_prompt)
        solutions_data = json.loads(extraction_response.text)
        
        # Return combined result
        return jsonify({
            "solutions": solutions_data.get("solutions", []),
            "sources": sources
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
