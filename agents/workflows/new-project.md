# Workflow: New Project Intake

> Triggered when a new client engagement begins.

## Trigger

A client brief, referral, or qualified lead is received and approved for assessment.

## Sequence

```
Phase 1: INTAKE
  → Project Controller receives brief
  → Project Controller produces Project Summary + Phase Plan
  → GATE: Engagement classification confirmed (Full / Rapid / Advisory)

Phase 2: SPATIAL & ECOLOGICAL BASELINE
  → GIS Analyst produces Site Characterization Package + Constraint Map
  → Eco-Scientist produces Ecological Baseline Report + Risk Matrix
  → (These two agents work in parallel; GIS feeds into Eco-Scientist's analysis)
  → GATE: Baseline data complete and reviewed

Phase 3: STRATEGY DESIGN
  → Regen-Architect produces Mitigation Hierarchy Matrix + NbS Concept Note
  → Regen-Architect produces Monitoring Framework
  → GIS Analyst produces Design Integration Maps
  → GATE: Restoration/mitigation strategy approved

Phase 4: FINANCIAL STRUCTURING
  → Green Financier produces Credit Feasibility Assessment
  → Green Financier produces Financial Model Summary + Bankability Memo
  → GATE: Financial viability confirmed or conditions documented

Phase 5: LEGAL REVIEW
  → Legal Compliance produces Regulatory Memo + Risk Memo
  → Legal Compliance produces Contract Package (if proceeding)
  → Legal Compliance produces Compliance Report
  → GATE: Legal clearance granted (Cleared / Conditionally cleared / Blocked)

Phase 6: DELIVERABLE ASSEMBLY
  → Project Controller compiles Executive Brief
  → Brand Voice formats client-facing materials
  → GATE: Final review and quality check

Phase 7: IMPLEMENTATION & MONITORING
  → Project Controller manages implementation oversight
  → Eco-Scientist and GIS Analyst establish monitoring baselines
  → Green Financier tracks financial performance against projections
```

## Agent Participation

| Phase | Lead Agent | Supporting Agents |
|---|---|---|
| 1. Intake | Project Controller | — |
| 2. Baseline | Eco-Scientist | GIS Analyst |
| 3. Design | Regen-Architect | GIS Analyst |
| 4. Finance | Green Financier | — |
| 5. Legal | Legal Compliance | Green Financier |
| 6. Deliverable | Project Controller | Brand Voice |
| 7. Implementation | Project Controller | Eco-Scientist, GIS Analyst, Green Financier |

## Gate Conditions

Each gate requires explicit sign-off before the next phase begins:

| Gate | Condition | Approver |
|---|---|---|
| G1 | Engagement classified, scope confirmed | Project Controller |
| G2 | Baseline data complete, no critical data gaps | Eco-Scientist |
| G3 | Strategy technically sound, monitoring KPIs defined | Regen-Architect |
| G4 | Financial model complete, bankability assessed | Green Financier |
| G5 | Legal clearance issued | Legal Compliance |
| G6 | All deliverables reviewed, quality confirmed | Project Controller |

## Handoff Chain

```
Client Brief
  → Project Controller [INTAKE]
    → GIS Analyst [SPATIAL]
    → Eco-Scientist [ECOLOGICAL]
      → Regen-Architect [DESIGN]
        → Green Financier [FINANCE]
          → Legal Compliance [LEGAL]
            → Project Controller [ASSEMBLY]
              → Client Deliverable
```

## Timing Guidance

| Engagement Type | Target Duration |
|---|---|
| Full Assessment | 8–12 weeks |
| Rapid Assessment | 3–4 weeks |
| Advisory / Opinion | 1–2 weeks |

## Failure Modes

| Failure | Response |
|---|---|
| Data gap in baseline | Eco-Scientist flags; Project Controller adjusts scope or timeline |
| Legal block | Legal Compliance escalates; Project Controller pauses until resolved |
| Financial non-viability | Green Financier documents conditions; Project Controller advises client |
| Scope creep | Project Controller enforces original scope or formally amends |
