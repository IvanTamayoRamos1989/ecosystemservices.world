"""
ESW — File Parser Agent
Scaffolding for automated PDF ingestion into the ESW Ontology.

This module provides the interface for extracting structured data from
uploaded documents (EIA reports, signed deliverables, credit certificates)
and populating Ontology objects automatically.

Architecture:
  - FileParser.ingest() accepts a file path + document type.
  - Extraction rules are defined per document type.
  - Parsed data is returned as a dict ready to feed into Ontology.create_*().
  - In production, this will integrate with an LLM extraction pipeline.

Supported document types (scaffold):
  - eia_report:        Environmental Impact Assessment
  - ecological_baseline: Signed ecological baseline report
  - credit_certificate:  Verra/Gold Standard/Plan Vivo certificate
  - land_agreement:      Notarised land access agreement
  - financial_model:     Bankability assessment / financial model
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import Any


class DocumentType(Enum):
    EIA_REPORT = "eia_report"
    ECOLOGICAL_BASELINE = "ecological_baseline"
    CREDIT_CERTIFICATE = "credit_certificate"
    LAND_AGREEMENT = "land_agreement"
    FINANCIAL_MODEL = "financial_model"
    VERIFICATION_STAMP = "verification_stamp"


@dataclass
class ParseResult:
    """Result of a document parsing operation."""
    success: bool
    document_type: DocumentType
    file_path: str
    file_hash: str
    extracted_fields: dict[str, Any]
    confidence_score: float  # 0.0 – 1.0
    warnings: list[str]
    parsed_at: datetime


# ── Extraction schemas per document type ─────────────────────────────

EXTRACTION_SCHEMAS: dict[DocumentType, dict[str, str]] = {
    DocumentType.EIA_REPORT: {
        "project_name": "string",
        "jurisdiction": "string",
        "site_area_hectares": "float",
        "biome_classification": "string",
        "species_count": "int",
        "red_list_species": "list[string]",
        "legal_framework": "string",
        "assessment_date": "date",
        "assessor_name": "string",
        "assessor_credentials": "string",
    },
    DocumentType.ECOLOGICAL_BASELINE: {
        "project_name": "string",
        "site_coordinates": "dict",
        "vegetation_cover_pct": "float",
        "biodiversity_score": "float",
        "carbon_stock_tco2e": "float",
        "water_bodies_count": "int",
        "soil_classification": "string",
        "signer_name": "string",
        "signer_credentials": "string",
        "signature_date": "date",
    },
    DocumentType.CREDIT_CERTIFICATE: {
        "standard": "string",        # Verra, Gold Standard, Plan Vivo
        "project_id": "string",
        "vintage_year": "int",
        "credit_type": "string",     # VCU, CER, biodiversity unit
        "volume": "float",
        "serial_numbers": "string",
        "issuance_date": "date",
        "registry_link": "string",
    },
    DocumentType.LAND_AGREEMENT: {
        "parties": "list[string]",
        "site_description": "string",
        "area_hectares": "float",
        "agreement_type": "string",  # lease, easement, purchase
        "duration_years": "int",
        "notary_name": "string",
        "notary_credentials": "string",
        "execution_date": "date",
        "governing_law": "string",
    },
    DocumentType.FINANCIAL_MODEL: {
        "project_name": "string",
        "capex_usd": "float",
        "npv_usd": "float",
        "irr_pct": "float",
        "payback_years": "float",
        "revenue_streams": "list[string]",
        "financing_structure": "string",
        "currency": "string",
    },
    DocumentType.VERIFICATION_STAMP: {
        "requirement_id": "string",
        "signer_name": "string",
        "signer_credentials": "string",
        "document_hash": "string",
        "signature_date": "date",
        "deliverable_type": "string",
        "jurisdiction": "string",
        "legal_basis": "string",
    },
}


class FileParser:
    """Parse uploaded documents and extract structured data for the Ontology.

    In production, this class integrates with an LLM extraction pipeline.
    This scaffold provides the interface, validation, and hash computation.

    Usage
    -----
    >>> parser = FileParser()
    >>> result = parser.ingest("/path/to/eia-report.pdf", DocumentType.EIA_REPORT)
    >>> result.extracted_fields
    {"project_name": "...", "jurisdiction": "...", ...}
    """

    def __init__(self) -> None:
        self._supported_extensions = {".pdf", ".docx", ".xlsx", ".csv", ".json"}

    def ingest(
        self,
        file_path: str,
        document_type: DocumentType,
    ) -> ParseResult:
        """Parse a document and return extracted fields.

        Parameters
        ----------
        file_path : str
            Path to the uploaded file.
        document_type : DocumentType
            The expected document type (determines extraction schema).

        Returns
        -------
        ParseResult with extracted_fields populated.
        """
        path = Path(file_path)
        self._validate_file(path)

        file_hash = self._compute_hash(path)
        schema = EXTRACTION_SCHEMAS.get(document_type, {})

        # Scaffold: return empty fields matching the schema
        # In production, this calls the LLM extraction pipeline
        extracted = {field_name: None for field_name in schema}
        warnings = [
            "Extraction scaffold active. LLM pipeline not connected.",
            f"Schema expects {len(schema)} fields for {document_type.value}.",
        ]

        return ParseResult(
            success=True,
            document_type=document_type,
            file_path=str(path.resolve()),
            file_hash=file_hash,
            extracted_fields=extracted,
            confidence_score=0.0,
            warnings=warnings,
            parsed_at=datetime.utcnow(),
        )

    def get_schema(self, document_type: DocumentType) -> dict[str, str]:
        """Return the extraction schema for a document type."""
        return EXTRACTION_SCHEMAS.get(document_type, {})

    def supported_types(self) -> list[str]:
        """Return list of supported document type values."""
        return [dt.value for dt in DocumentType]

    def _validate_file(self, path: Path) -> None:
        """Validate file exists and has a supported extension."""
        if not path.exists():
            raise FileNotFoundError(f"File not found: {path}")
        if path.suffix.lower() not in self._supported_extensions:
            raise ValueError(
                f"Unsupported file type: {path.suffix}. "
                f"Supported: {', '.join(self._supported_extensions)}"
            )

    @staticmethod
    def _compute_hash(path: Path) -> str:
        """Compute SHA-256 hash of file contents."""
        import hashlib
        sha256 = hashlib.sha256()
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                sha256.update(chunk)
        return f"sha256:{sha256.hexdigest()}"


# ── CLI usage ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = FileParser()

    print("ESW File Parser — Supported Document Types")
    print("=" * 50)
    for doc_type in DocumentType:
        schema = parser.get_schema(doc_type)
        print(f"\n  {doc_type.value}:")
        for field_name, field_type in schema.items():
            print(f"    - {field_name}: {field_type}")
