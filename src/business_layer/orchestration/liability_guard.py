"""
ESW — Liability Guard
State machine that tracks human stamp requirements for project deliverables.
Blocks final deliverable release until all mandatory human signatures are
logged and verified.

Design principle:
  - Every deliverable requiring a human stamp must be registered before the
    human execution phase begins.
  - Signatures are recorded with document hash for integrity verification.
  - Release is binary: all stamps must be STAMPED or the project is blocked.
    There is no partial release.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum


# ── Stamp lifecycle states ────────────────────────────────────────────

class StampStatus(Enum):
    """Lifecycle of a single stamp requirement."""
    PENDING = "pending"                   # Registered, not yet sent to vendor
    AWAITING_UPLOAD = "awaiting_upload"   # Vendor contracted, waiting for deliverable
    UNDER_REVIEW = "under_review"         # Deliverable uploaded, under technical review
    STAMPED = "stamped"                   # Accepted, signature verified
    REJECTED = "rejected"                 # Deliverable failed review
    EXPIRED = "expired"                   # Stamp validity period exceeded


# ── Configuration ─────────────────────────────────────────────────────

# Default stamp validity period (days from signature date)
DEFAULT_STAMP_VALIDITY_DAYS = 365

# Maximum revision cycles before escalation
MAX_REVISION_CYCLES = 2


# ── Data structures ───────────────────────────────────────────────────

@dataclass
class StampRequirement:
    """A single human stamp requirement for a project deliverable."""
    requirement_id: str
    project_id: str
    role_title: str
    jurisdiction: str
    deliverable_id: str
    legal_basis: str
    priority: str  # "critical" | "standard"
    status: StampStatus = StampStatus.PENDING
    signer_name: str | None = None
    signer_credentials: str | None = None
    document_hash: str | None = None
    signature_date: datetime | None = None
    expiry_date: datetime | None = None
    revision_count: int = 0
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class GuardResult:
    """Result of a release check against all stamp requirements."""
    can_release: bool
    total_requirements: int
    stamped_count: int
    blocking_requirements: list[StampRequirement]
    summary: str


# ── Main class ────────────────────────────────────────────────────────

class LiabilityGuard:
    """Track and enforce human stamp requirements for ESW projects.

    Parameters
    ----------
    stamp_validity_days : int
        Number of days a stamp remains valid after signature. Defaults to 365.

    Usage
    -----
    >>> guard = LiabilityGuard()
    >>> guard.register_requirement(
    ...     requirement_id="HR-001",
    ...     project_id="PRJ-2026-042",
    ...     role_title="Licensed Biologist",
    ...     jurisdiction="Mexico (Sinaloa)",
    ...     deliverable_id="ecological_baseline_report",
    ...     legal_basis="LGEEPA Art. 35; NOM-059-SEMARNAT-2010",
    ...     priority="critical",
    ... )
    >>> guard.advance_status("HR-001", StampStatus.AWAITING_UPLOAD)
    >>> guard.advance_status("HR-001", StampStatus.UNDER_REVIEW)
    >>> guard.record_signature(
    ...     requirement_id="HR-001",
    ...     signer_name="Dra. Maria Lopez",
    ...     signer_credentials="Cedula Profesional #12345678",
    ...     document_hash="sha256:a1b2c3d4e5f6...",
    ... )
    >>> result = guard.check_release("PRJ-2026-042")
    >>> result.can_release
    True
    """

    # Valid state transitions
    _VALID_TRANSITIONS: dict[StampStatus, list[StampStatus]] = {
        StampStatus.PENDING: [StampStatus.AWAITING_UPLOAD],
        StampStatus.AWAITING_UPLOAD: [StampStatus.UNDER_REVIEW],
        StampStatus.UNDER_REVIEW: [StampStatus.STAMPED, StampStatus.REJECTED],
        StampStatus.REJECTED: [StampStatus.AWAITING_UPLOAD, StampStatus.EXPIRED],
        StampStatus.STAMPED: [StampStatus.EXPIRED],
        StampStatus.EXPIRED: [StampStatus.AWAITING_UPLOAD],
    }

    def __init__(self, stamp_validity_days: int = DEFAULT_STAMP_VALIDITY_DAYS) -> None:
        self.stamp_validity_days = stamp_validity_days
        self._requirements: dict[str, StampRequirement] = {}

    # ── Public API ────────────────────────────────────────────────────

    def register_requirement(
        self,
        requirement_id: str,
        project_id: str,
        role_title: str,
        jurisdiction: str,
        deliverable_id: str,
        legal_basis: str,
        priority: str = "critical",
    ) -> StampRequirement:
        """Register a new human stamp requirement.

        Raises ValueError if requirement_id already exists.
        """
        if requirement_id in self._requirements:
            raise ValueError(
                f"Requirement '{requirement_id}' already registered."
            )
        if priority not in ("critical", "standard"):
            raise ValueError(
                f"Priority must be 'critical' or 'standard', got '{priority}'."
            )

        req = StampRequirement(
            requirement_id=requirement_id,
            project_id=project_id,
            role_title=role_title,
            jurisdiction=jurisdiction,
            deliverable_id=deliverable_id,
            legal_basis=legal_basis,
            priority=priority,
        )
        self._requirements[requirement_id] = req
        return req

    def advance_status(
        self,
        requirement_id: str,
        new_status: StampStatus,
    ) -> StampRequirement:
        """Move a requirement to the next status in its lifecycle.

        Validates that the transition is legal per _VALID_TRANSITIONS.
        Raises ValueError for invalid transitions.
        Raises RuntimeError if revision_count exceeds MAX_REVISION_CYCLES.
        """
        req = self.get_requirement(requirement_id)
        self._validate_transition(req.status, new_status)

        # Track revision cycles (REJECTED → AWAITING_UPLOAD)
        if req.status == StampStatus.REJECTED and new_status == StampStatus.AWAITING_UPLOAD:
            req.revision_count += 1
            if req.revision_count > MAX_REVISION_CYCLES:
                raise RuntimeError(
                    f"Requirement '{requirement_id}' has exceeded the maximum "
                    f"of {MAX_REVISION_CYCLES} revision cycles. Escalate to "
                    f"Project Controller for resolution."
                )

        req.status = new_status
        req.updated_at = datetime.utcnow()
        return req

    def record_signature(
        self,
        requirement_id: str,
        signer_name: str,
        signer_credentials: str,
        document_hash: str,
    ) -> StampRequirement:
        """Record a verified human signature on a deliverable.

        This is a compound operation:
        1. Validates requirement is in UNDER_REVIEW status.
        2. Sets signer info, document hash, signature date.
        3. Computes expiry date (signature_date + stamp_validity_days).
        4. Advances status to STAMPED.

        Raises ValueError if requirement is not in UNDER_REVIEW status.
        """
        req = self.get_requirement(requirement_id)
        if req.status != StampStatus.UNDER_REVIEW:
            raise ValueError(
                f"Cannot record signature: requirement '{requirement_id}' is "
                f"in status '{req.status.value}', expected 'under_review'."
            )

        now = datetime.utcnow()
        req.signer_name = signer_name
        req.signer_credentials = signer_credentials
        req.document_hash = document_hash
        req.signature_date = now
        req.expiry_date = now + timedelta(days=self.stamp_validity_days)
        req.status = StampStatus.STAMPED
        req.updated_at = now
        return req

    def check_release(self, project_id: str) -> GuardResult:
        """Check whether all stamp requirements for a project are satisfied.

        Returns a GuardResult. can_release is True only if every requirement
        for the project has status == STAMPED and has not expired.
        """
        return self._compute_release(project_id)

    def get_status(self, project_id: str) -> list[StampRequirement]:
        """Return all stamp requirements for a project, sorted by priority.

        Critical requirements appear first, then standard.
        """
        project_reqs = [
            r for r in self._requirements.values()
            if r.project_id == project_id
        ]
        priority_order = {"critical": 0, "standard": 1}
        return sorted(
            project_reqs,
            key=lambda r: priority_order.get(r.priority, 2),
        )

    def get_requirement(self, requirement_id: str) -> StampRequirement:
        """Return a single requirement by ID.

        Raises KeyError if not found.
        """
        if requirement_id not in self._requirements:
            raise KeyError(
                f"Requirement '{requirement_id}' not found."
            )
        return self._requirements[requirement_id]

    # ── Private methods ───────────────────────────────────────────────

    def _compute_release(self, project_id: str) -> GuardResult:
        """Core release computation.

        1. Filter requirements by project_id.
        2. Check for expired stamps (signature_date + validity > now).
        3. Identify blocking requirements (any not STAMPED).
        4. Build summary string.
        """
        now = datetime.utcnow()
        project_reqs = [
            r for r in self._requirements.values()
            if r.project_id == project_id
        ]

        # Auto-expire stamps that have exceeded their validity period
        for req in project_reqs:
            if (
                req.status == StampStatus.STAMPED
                and req.expiry_date is not None
                and req.expiry_date < now
            ):
                req.status = StampStatus.EXPIRED
                req.updated_at = now

        stamped = [r for r in project_reqs if r.status == StampStatus.STAMPED]
        blocking = [r for r in project_reqs if r.status != StampStatus.STAMPED]

        if len(project_reqs) == 0:
            return GuardResult(
                can_release=True,
                total_requirements=0,
                stamped_count=0,
                blocking_requirements=[],
                summary=(
                    f"No stamp requirements registered for project "
                    f"{project_id}. No human sign-off needed."
                ),
            )

        can_release = len(blocking) == 0

        if can_release:
            summary = (
                f"All {len(stamped)} stamp requirements satisfied for "
                f"project {project_id}. Deliverable release authorised."
            )
        else:
            summary = (
                f"{len(blocking)} of {len(project_reqs)} stamp requirements "
                f"outstanding for project {project_id}. Release blocked."
            )

        return GuardResult(
            can_release=can_release,
            total_requirements=len(project_reqs),
            stamped_count=len(stamped),
            blocking_requirements=blocking,
            summary=summary,
        )

    def _validate_transition(
        self,
        current: StampStatus,
        target: StampStatus,
    ) -> None:
        """Raise ValueError if the transition is not allowed."""
        valid = self._VALID_TRANSITIONS.get(current, [])
        if target not in valid:
            raise ValueError(
                f"Invalid transition: {current.value} → {target.value}. "
                f"Valid transitions from {current.value}: "
                f"{[s.value for s in valid]}"
            )


# ── Airlock ──────────────────────────────────────────────────────────

class Airlock:
    """The Airlock: no deliverable leaves the platform without a Verification
    object linked to it. This class wraps LiabilityGuard with a hard gate
    that blocks any export, publish, or release action.

    Usage
    -----
    >>> airlock = Airlock()
    >>> airlock.register("PRJ-001", "HR-001", ...)
    >>> airlock.attempt_release("PRJ-001", "ecological_baseline_report")
    AirlockResult(released=False, blocked_by=[...])
    """

    def __init__(self, guard: LiabilityGuard | None = None) -> None:
        self._guard = guard or LiabilityGuard()
        self._deliverable_map: dict[str, list[str]] = {}  # deliverable_id → [requirement_ids]

    @property
    def guard(self) -> LiabilityGuard:
        return self._guard

    def register(
        self,
        project_id: str,
        requirement_id: str,
        deliverable_id: str,
        role_title: str,
        jurisdiction: str,
        legal_basis: str,
        priority: str = "critical",
    ) -> StampRequirement:
        """Register a stamp requirement and link it to a deliverable."""
        req = self._guard.register_requirement(
            requirement_id=requirement_id,
            project_id=project_id,
            role_title=role_title,
            jurisdiction=jurisdiction,
            deliverable_id=deliverable_id,
            legal_basis=legal_basis,
            priority=priority,
        )
        if deliverable_id not in self._deliverable_map:
            self._deliverable_map[deliverable_id] = []
        self._deliverable_map[deliverable_id].append(requirement_id)
        return req

    def attempt_release(self, project_id: str, deliverable_id: str) -> dict:
        """Attempt to release a specific deliverable.

        Returns a dict with release status and any blocking requirements.
        This is the hard gate — if ANY linked verification is not STAMPED,
        the deliverable is blocked.
        """
        linked_req_ids = self._deliverable_map.get(deliverable_id, [])

        if not linked_req_ids:
            return {
                "released": False,
                "deliverable_id": deliverable_id,
                "reason": "No verification requirements linked to this deliverable. "
                          "Register at least one stamp requirement before release.",
                "blocked_by": [],
            }

        blocking = []
        for req_id in linked_req_ids:
            req = self._guard.get_requirement(req_id)
            if req.status != StampStatus.STAMPED:
                blocking.append({
                    "requirement_id": req.requirement_id,
                    "role_title": req.role_title,
                    "status": req.status.value,
                    "jurisdiction": req.jurisdiction,
                })
            elif req.expiry_date and req.expiry_date < datetime.utcnow():
                req.status = StampStatus.EXPIRED
                req.updated_at = datetime.utcnow()
                blocking.append({
                    "requirement_id": req.requirement_id,
                    "role_title": req.role_title,
                    "status": "expired",
                    "jurisdiction": req.jurisdiction,
                })

        released = len(blocking) == 0
        return {
            "released": released,
            "deliverable_id": deliverable_id,
            "reason": "Deliverable released. All stamps verified." if released
                      else f"{len(blocking)} stamp(s) outstanding. Release blocked.",
            "blocked_by": blocking,
        }

    def project_clearance(self, project_id: str) -> dict:
        """Full project release check — all deliverables, all stamps."""
        guard_result = self._guard.check_release(project_id)
        return {
            "project_id": project_id,
            "cleared": guard_result.can_release,
            "total_stamps": guard_result.total_requirements,
            "verified_stamps": guard_result.stamped_count,
            "blocking": [
                {
                    "requirement_id": r.requirement_id,
                    "role_title": r.role_title,
                    "deliverable_id": r.deliverable_id,
                    "status": r.status.value,
                }
                for r in guard_result.blocking_requirements
            ],
            "summary": guard_result.summary,
        }


# ── CLI usage ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    # Example: Culiacán Green Corridors project with 2 stamp requirements
    guard = LiabilityGuard()

    # Register requirements (from Talent Scout Role Request JSON)
    guard.register_requirement(
        requirement_id="HR-001",
        project_id="PRJ-2026-042",
        role_title="Licensed Biologist",
        jurisdiction="Mexico (Sinaloa)",
        deliverable_id="ecological_baseline_report",
        legal_basis="LGEEPA Art. 35; NOM-059-SEMARNAT-2010",
        priority="critical",
    )
    guard.register_requirement(
        requirement_id="HR-002",
        project_id="PRJ-2026-042",
        role_title="Notary Public",
        jurisdiction="Mexico (Sinaloa)",
        deliverable_id="land_access_agreement",
        legal_basis="Ley del Notariado para el Estado de Sinaloa",
        priority="standard",
    )

    # Check before any signatures — should be blocked
    result = guard.check_release("PRJ-2026-042")
    print("BEFORE SIGNATURES")
    print(f"  Can release: {result.can_release}")
    print(f"  Summary: {result.summary}")
    print(f"  Blocking: {len(result.blocking_requirements)}")

    # Simulate full lifecycle for HR-001 (Licensed Biologist)
    guard.advance_status("HR-001", StampStatus.AWAITING_UPLOAD)
    guard.advance_status("HR-001", StampStatus.UNDER_REVIEW)
    guard.record_signature(
        requirement_id="HR-001",
        signer_name="Dra. Maria Lopez Hernandez",
        signer_credentials="Cedula Profesional #12345678",
        document_hash="sha256:e3b0c44298fc1c149afbf4c8996fb924",
    )

    # Check mid-process — still blocked (HR-002 pending)
    result = guard.check_release("PRJ-2026-042")
    print("\nAFTER HR-001 SIGNED (HR-002 still pending)")
    print(f"  Can release: {result.can_release}")
    print(f"  Stamped: {result.stamped_count}/{result.total_requirements}")
    print(f"  Summary: {result.summary}")

    # Simulate full lifecycle for HR-002 (Notary Public)
    guard.advance_status("HR-002", StampStatus.AWAITING_UPLOAD)
    guard.advance_status("HR-002", StampStatus.UNDER_REVIEW)
    guard.record_signature(
        requirement_id="HR-002",
        signer_name="Lic. Carlos Gutierrez",
        signer_credentials="Notario Publico #42, Sinaloa",
        document_hash="sha256:d7a8fbb307d7809469ca9abcb0082e4f",
    )

    # Check after all signatures — should be released
    result = guard.check_release("PRJ-2026-042")
    print("\nAFTER ALL SIGNATURES")
    print(f"  Can release: {result.can_release}")
    print(f"  Stamped: {result.stamped_count}/{result.total_requirements}")
    print(f"  Summary: {result.summary}")

    # Print full status
    print("\nFULL STATUS")
    for req in guard.get_status("PRJ-2026-042"):
        print(
            f"  [{req.requirement_id}] {req.role_title} — "
            f"{req.status.value} — signed by {req.signer_name}"
        )
