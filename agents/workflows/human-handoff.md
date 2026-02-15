# Workflow: Human-in-the-Loop Handoff

> Triggered when a project requires human-stamped deliverables that AI agents cannot legally produce.

## Purpose

Full lifecycle management of external human expert engagement within an ESW project. This workflow runs as a sub-process within the main project workflow (`new-project.md`), typically initiated during or after Phase 2 (Baseline) when deliverable requirements become clear.

## Trigger

- Talent Scout identifies one or more mandatory human interventions
- Project Controller flags a deliverable as requiring professional sign-off
- Legal Compliance identifies a jurisdiction-specific stamp requirement
- DFI or credit registry requires accredited third-party verification

## Sequence

```
Phase 1: DISCOVERY
  → Project Controller identifies all project deliverables
  → Project Controller flags deliverables with potential human requirements
  → GATE: Deliverable list finalised and classified (G-DISC)

Phase 2: TALENT SCAN
  → Talent Scout receives project brief, jurisdiction, CAPEX tier
  → Talent Scout produces Human Intervention Scan Summary
  → Talent Scout produces Role Request Register (table + JSON)
  → GATE: Role Request Register reviewed by Project Controller and
    Legal Compliance. All roles confirmed as mandatory or downgraded
    to recommended. (G-SCAN)

Phase 3: PROCUREMENT
  → Procurement Manager receives approved Role Request Register
  → Procurement Manager drafts SOW for each required role
  → Legal Compliance reviews SOW terms
  → GATE: SOW approved (G-SOW)
  → Procurement Manager sources and qualifies vendors
  → Project Controller approves vendor selection and budget
  → GATE: Vendor contracted (G-VENDOR)
  → Procurement Manager registers all stamp requirements with
    LiabilityGuard (via Role Request JSON)

Phase 4: HUMAN EXECUTION (Wait State)
  → Vendor performs contracted work
  → Procurement Manager monitors progress against milestones
  → Procurement Manager provides vendor with required inputs (data
    packages, site access coordination, draft documents for review)
  → Status: AWAITING_UPLOAD in LiabilityGuard
  → Escalation trigger: if vendor misses milestone by >5 business
    days, Procurement Manager alerts Project Controller

Phase 5: DELIVERABLE INTAKE
  → Vendor uploads signed deliverable via Vendor Portal
  → Procurement Manager verifies:
    a. Document format matches SOW requirements
    b. Signature present and valid (wet or qualified e-signature)
    c. Signer credentials match contracted role
    d. Document hash (SHA-256) recorded
  → Domain specialist reviews technical content:
    - EIA report → Eco-Scientist
    - Financial audit → Green Financier
    - Legal opinion → Legal Compliance
    - Credit verification → Green Financier + Eco-Scientist
  → GATE: Deliverable accepted or rejected (G-DELIVER)
  → If rejected: Procurement Manager issues revision request to
    vendor, returns to Phase 4 for that deliverable only

Phase 6: LIABILITY CHECK
  → Procurement Manager calls LiabilityGuard.record_signature() for
    each accepted deliverable
  → LiabilityGuard.check_release(project_id) evaluates all requirements
  → If all STAMPED: GuardResult.can_release = True
  → If any PENDING / AWAITING_UPLOAD / UNDER_REVIEW:
    GuardResult.can_release = False, blocking_requirements lists
    outstanding items
  → If any REJECTED: Procurement Manager initiates rejection flow
  → GATE: LiabilityGuard confirms all stamps in place (G-STAMP)

Phase 7: RELEASE
  → Project Controller receives clearance from LiabilityGuard
  → Project Controller proceeds to Deliverable Assembly (Phase 6 of
    new-project.md workflow)
  → Final deliverable package includes all human-stamped documents
  → Client download is unlocked only after G-STAMP passes
  → GATE: Final package assembled, all stamps verified (G-RELEASE)
```

## Agent Participation

| Phase | Lead Agent | Supporting Agents |
|---|---|---|
| 1. Discovery | Project Controller | — |
| 2. Talent Scan | Talent Scout | Legal Compliance (review) |
| 3. Procurement | Procurement Manager | Legal Compliance, Project Controller |
| 4. Human Execution | Procurement Manager | Project Controller (escalation) |
| 5. Deliverable Intake | Procurement Manager | Domain specialists (review) |
| 6. Liability Check | Procurement Manager | LiabilityGuard (automated) |
| 7. Release | Project Controller | Brand Voice (formatting) |

## Gate Conditions

| Gate | Condition | Approver |
|---|---|---|
| G-DISC | Deliverable list finalised, human requirements flagged | Project Controller |
| G-SCAN | Role Request Register confirmed, all roles validated | Project Controller + Legal Compliance |
| G-SOW | SOW terms approved, budget allocated | Legal Compliance + Project Controller |
| G-VENDOR | Vendor contracted, credentials verified, NDA executed | Procurement Manager + Project Controller |
| G-DELIVER | Deliverable uploaded, reviewed, technically accepted | Procurement Manager + Domain Specialist |
| G-STAMP | LiabilityGuard.check_release() returns can_release=True | LiabilityGuard (automated) |
| G-RELEASE | Final package assembled, all stamps verified | Project Controller |

## Rejection and Failure Flows

| Failure | Response | Owner |
|---|---|---|
| Role Request disputed | Legal Compliance re-evaluates; Project Controller decides | Legal Compliance |
| SOW rejected by Legal | Procurement Manager revises terms | Procurement Manager |
| No qualified vendor found | Procurement Manager expands search; Project Controller adjusts timeline | Procurement Manager |
| Vendor misses deadline | Procurement Manager escalates; Project Controller evaluates backup vendor | Procurement Manager |
| Deliverable rejected (quality) | Revision request issued; vendor re-submits; max 2 revision cycles | Procurement Manager |
| Deliverable rejected (credentials) | Vendor replaced; new SOW cycle initiated | Procurement Manager |
| Stamp expired | Procurement Manager initiates re-certification; LiabilityGuard status → EXPIRED | Procurement Manager |
| Vendor breach / default | Legal Compliance assesses contractual remedies; backup vendor engaged | Legal Compliance |

## Integration with New Project Workflow

This workflow inserts between Phase 2 (Baseline) and Phase 6 (Deliverable Assembly) of the standard `new-project.md` workflow. It runs in parallel with Phases 3–5 (Design, Finance, Legal) and must complete before Phase 6 (Assembly) can begin.

```
new-project.md Phase 2: BASELINE
  │
  ├──→ human-handoff.md (Phases 1–7) [parallel track]
  │
  ├──→ new-project.md Phases 3–5   [main track]
  │
  Both must complete
  │
  ▼
new-project.md Phase 6: DELIVERABLE ASSEMBLY
```

## Timing Guidance

| Step | Typical Duration |
|---|---|
| Talent Scan | 1–2 days |
| SOW Drafting + Legal Review | 3–5 days |
| Vendor Sourcing + Contracting | 5–10 days |
| Human Execution (varies by role) | 2–12 weeks |
| Deliverable Review + Acceptance | 3–5 days |
| LiabilityGuard Check | Automated (instant) |

## Standards

- This workflow must not block the main project workflow unless a human deliverable is on the critical path. Non-critical human deliverables can be collected in parallel.
- Every stamp requirement must be registered with LiabilityGuard before Phase 4 begins. Late additions require Project Controller approval and timeline reassessment.
- Document hashes must be computed at upload time and verified at acceptance. Hash mismatches trigger automatic rejection.
- All vendor communications are logged. The Procurement Manager maintains an audit trail.
