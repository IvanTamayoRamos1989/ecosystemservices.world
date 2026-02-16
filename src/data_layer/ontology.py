"""
ESW — Live Ontology
Core object model for the ESW Digital Twin platform.

Every project is represented as a graph of four core objects:
  - Asset:         The site polygon (what we manage)
  - Liability:     The regulatory requirement (what we must satisfy)
  - Intervention:  The project action (what we do)
  - Verification:  The human stamp (what makes it real)

Design principles:
  - Every object has a unique ID, creation timestamp, and audit trail.
  - Objects are linked via explicit foreign keys (not implicit naming).
  - No object exists in isolation — orphan detection is built-in.
  - The Ontology class is the single entry point for all CRUD operations.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any
from uuid import uuid4


# ── Enums ────────────────────────────────────────────────────────────

class AssetStatus(Enum):
    PIPELINE = "pipeline"
    ACTIVE = "active"
    VERIFIED = "verified"
    ARCHIVED = "archived"


class LiabilityType(Enum):
    REGULATORY = "regulatory"         # CSRD, TNFD, EU Taxonomy, national law
    CREDIT_STANDARD = "credit_standard"  # Verra VCS, Gold Standard, Plan Vivo
    CONTRACTUAL = "contractual"       # Client SLA, DFI covenant


class InterventionType(Enum):
    BASELINE_ASSESSMENT = "baseline_assessment"
    NBS_DESIGN = "nbs_design"
    RESTORATION = "restoration"
    MONITORING = "monitoring"
    CREDIT_ISSUANCE = "credit_issuance"
    EIA = "eia"
    FINANCIAL_STRUCTURING = "financial_structuring"


class VerificationStatus(Enum):
    PENDING = "pending"
    AWAITING_UPLOAD = "awaiting_upload"
    UNDER_REVIEW = "under_review"
    VERIFIED = "verified"
    REJECTED = "rejected"
    EXPIRED = "expired"


# ── Core Objects ─────────────────────────────────────────────────────

@dataclass
class Asset:
    """The Site Polygon — the physical nature asset under management."""
    asset_id: str = field(default_factory=lambda: f"AST-{uuid4().hex[:8].upper()}")
    project_name: str = ""
    jurisdiction: str = ""
    biome: str = ""
    hectares: float = 0.0
    coordinates: dict = field(default_factory=dict)  # {"lat": float, "lng": float}
    status: AssetStatus = AssetStatus.PIPELINE
    biodiversity_score: float = 0.0
    carbon_sequestered_tco2e: float = 0.0
    credits_pipeline_usd: float = 0.0
    compliance_frameworks: list[str] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Liability:
    """The Regulatory Requirement — what must be satisfied for an asset."""
    liability_id: str = field(default_factory=lambda: f"LIA-{uuid4().hex[:8].upper()}")
    asset_id: str = ""                          # FK → Asset
    liability_type: LiabilityType = LiabilityType.REGULATORY
    framework: str = ""                         # e.g. "CSRD", "Verra VCS v4.5"
    requirement_description: str = ""
    legal_basis: str = ""                       # e.g. "LGEEPA Art. 35"
    jurisdiction: str = ""
    deadline: datetime | None = None
    is_satisfied: bool = False
    linked_verification_id: str | None = None   # FK → Verification (when satisfied)
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Intervention:
    """The Project Action — work performed on an asset."""
    intervention_id: str = field(default_factory=lambda: f"INT-{uuid4().hex[:8].upper()}")
    asset_id: str = ""                          # FK → Asset
    intervention_type: InterventionType = InterventionType.BASELINE_ASSESSMENT
    description: str = ""
    assigned_agent: str = ""                    # ESW agent role (e.g. "eco-scientist")
    deliverable_id: str = ""                    # Reference to output document
    status: str = "planned"                     # planned | in_progress | completed | blocked
    cost_usd: float = 0.0
    linked_liability_ids: list[str] = field(default_factory=list)  # FK → Liability[]
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class Verification:
    """The Human Stamp — the sign-off that makes a deliverable real."""
    verification_id: str = field(default_factory=lambda: f"VER-{uuid4().hex[:8].upper()}")
    intervention_id: str = ""                   # FK → Intervention
    asset_id: str = ""                          # FK → Asset
    role_title: str = ""                        # e.g. "Licensed Biologist"
    signer_name: str | None = None
    signer_credentials: str | None = None
    document_hash: str | None = None            # SHA-256 of signed deliverable
    status: VerificationStatus = VerificationStatus.PENDING
    jurisdiction: str = ""
    legal_basis: str = ""
    signature_date: datetime | None = None
    expiry_date: datetime | None = None
    revision_count: int = 0
    metadata: dict[str, Any] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


# ── Ontology (Registry + Query Layer) ────────────────────────────────

class Ontology:
    """The Live Ontology — single source of truth for all ESW objects.

    Usage
    -----
    >>> onto = Ontology()
    >>> asset = onto.create_asset(project_name="Culiacán Green Corridors", ...)
    >>> liability = onto.create_liability(asset_id=asset.asset_id, ...)
    >>> intervention = onto.create_intervention(asset_id=asset.asset_id, ...)
    >>> verification = onto.create_verification(intervention_id=intervention.intervention_id, ...)
    >>> onto.can_release(asset.asset_id)  # False until all verifications pass
    """

    def __init__(self) -> None:
        self._assets: dict[str, Asset] = {}
        self._liabilities: dict[str, Liability] = {}
        self._interventions: dict[str, Intervention] = {}
        self._verifications: dict[str, Verification] = {}

    # ── Asset CRUD ───────────────────────────────────────────────────

    def create_asset(self, **kwargs) -> Asset:
        asset = Asset(**kwargs)
        self._assets[asset.asset_id] = asset
        return asset

    def get_asset(self, asset_id: str) -> Asset:
        if asset_id not in self._assets:
            raise KeyError(f"Asset '{asset_id}' not found.")
        return self._assets[asset_id]

    def list_assets(self, status: AssetStatus | None = None) -> list[Asset]:
        assets = list(self._assets.values())
        if status:
            assets = [a for a in assets if a.status == status]
        return sorted(assets, key=lambda a: a.created_at, reverse=True)

    # ── Liability CRUD ───────────────────────────────────────────────

    def create_liability(self, **kwargs) -> Liability:
        liability = Liability(**kwargs)
        if liability.asset_id and liability.asset_id not in self._assets:
            raise KeyError(f"Asset '{liability.asset_id}' not found. Cannot create orphan liability.")
        self._liabilities[liability.liability_id] = liability
        return liability

    def get_liabilities_for_asset(self, asset_id: str) -> list[Liability]:
        return [l for l in self._liabilities.values() if l.asset_id == asset_id]

    # ── Intervention CRUD ────────────────────────────────────────────

    def create_intervention(self, **kwargs) -> Intervention:
        intervention = Intervention(**kwargs)
        if intervention.asset_id and intervention.asset_id not in self._assets:
            raise KeyError(f"Asset '{intervention.asset_id}' not found. Cannot create orphan intervention.")
        self._interventions[intervention.intervention_id] = intervention
        return intervention

    def get_interventions_for_asset(self, asset_id: str) -> list[Intervention]:
        return [i for i in self._interventions.values() if i.asset_id == asset_id]

    # ── Verification CRUD ────────────────────────────────────────────

    def create_verification(self, **kwargs) -> Verification:
        verification = Verification(**kwargs)
        if verification.intervention_id and verification.intervention_id not in self._interventions:
            raise KeyError(
                f"Intervention '{verification.intervention_id}' not found. "
                f"Cannot create orphan verification."
            )
        self._verifications[verification.verification_id] = verification
        return verification

    def get_verifications_for_asset(self, asset_id: str) -> list[Verification]:
        return [v for v in self._verifications.values() if v.asset_id == asset_id]

    def get_verifications_for_intervention(self, intervention_id: str) -> list[Verification]:
        return [v for v in self._verifications.values() if v.intervention_id == intervention_id]

    # ── Airlock (Release Gate) ───────────────────────────────────────

    def can_release(self, asset_id: str) -> dict:
        """Check if all verifications for an asset are satisfied.

        This is the Airlock gate: no deliverable leaves the platform
        without every linked Verification in VERIFIED status.
        """
        verifications = self.get_verifications_for_asset(asset_id)
        if not verifications:
            return {
                "can_release": False,
                "reason": "No verifications registered. At least one human stamp is required.",
                "total": 0,
                "verified": 0,
                "blocking": [],
            }

        now = datetime.utcnow()
        blocking = []
        verified_count = 0

        for v in verifications:
            if v.status == VerificationStatus.VERIFIED:
                if v.expiry_date and v.expiry_date < now:
                    v.status = VerificationStatus.EXPIRED
                    v.updated_at = now
                    blocking.append(v)
                else:
                    verified_count += 1
            else:
                blocking.append(v)

        can_release = len(blocking) == 0

        return {
            "can_release": can_release,
            "reason": "All verifications satisfied." if can_release else f"{len(blocking)} verification(s) outstanding.",
            "total": len(verifications),
            "verified": verified_count,
            "blocking": [
                {
                    "id": v.verification_id,
                    "role": v.role_title,
                    "status": v.status.value,
                }
                for v in blocking
            ],
        }

    # ── Portfolio Metrics ────────────────────────────────────────────

    def portfolio_summary(self) -> dict:
        """Aggregate metrics across all assets — the Nature Balance Sheet."""
        assets = list(self._assets.values())
        return {
            "total_assets": len(assets),
            "total_hectares": sum(a.hectares for a in assets),
            "total_carbon_tco2e": sum(a.carbon_sequestered_tco2e for a in assets),
            "total_credits_pipeline_usd": sum(a.credits_pipeline_usd for a in assets),
            "avg_biodiversity_score": (
                sum(a.biodiversity_score for a in assets) / len(assets)
                if assets else 0.0
            ),
            "by_status": {
                status.value: len([a for a in assets if a.status == status])
                for status in AssetStatus
            },
            "jurisdictions": list(set(a.jurisdiction for a in assets if a.jurisdiction)),
        }


# ── CLI usage ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    onto = Ontology()

    # Create a project
    asset = onto.create_asset(
        project_name="Green Corridors — Culiacán",
        jurisdiction="Mexico (Sinaloa)",
        biome="Tropical Dry Forest",
        hectares=12400,
        status=AssetStatus.ACTIVE,
        biodiversity_score=7.8,
        carbon_sequestered_tco2e=48200,
        credits_pipeline_usd=4200000,
        compliance_frameworks=["LGEEPA", "Verra VCS"],
    )

    # Add regulatory liability
    liability = onto.create_liability(
        asset_id=asset.asset_id,
        liability_type=LiabilityType.REGULATORY,
        framework="LGEEPA",
        requirement_description="Environmental Impact Assessment required per Art. 35",
        legal_basis="LGEEPA Art. 35; NOM-059-SEMARNAT-2010",
        jurisdiction="Mexico (Sinaloa)",
    )

    # Add intervention
    intervention = onto.create_intervention(
        asset_id=asset.asset_id,
        intervention_type=InterventionType.BASELINE_ASSESSMENT,
        description="Ecological Baseline Report — field survey + remote sensing",
        assigned_agent="eco-scientist",
        deliverable_id="ecological_baseline_report",
        linked_liability_ids=[liability.liability_id],
    )

    # Add verification requirement
    verification = onto.create_verification(
        intervention_id=intervention.intervention_id,
        asset_id=asset.asset_id,
        role_title="Licensed Biologist",
        jurisdiction="Mexico (Sinaloa)",
        legal_basis="LGEEPA Art. 35",
    )

    # Check release — should be blocked
    result = onto.can_release(asset.asset_id)
    print("AIRLOCK CHECK (before stamp)")
    print(f"  Can release: {result['can_release']}")
    print(f"  Reason: {result['reason']}")
    print(f"  Blocking: {result['blocking']}")

    # Portfolio summary
    print("\nPORTFOLIO SUMMARY")
    summary = onto.portfolio_summary()
    for k, v in summary.items():
        print(f"  {k}: {v}")
