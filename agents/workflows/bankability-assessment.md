# Workflow: Bankability Assessment

> From raw project brief to bankable deal package.

## Purpose

This workflow takes a project that has completed its technical baseline (Phases 1-3 of the New Project workflow) and runs it through ESW's commercial pipeline: risk underwriting → financial structuring → deal packaging → investor matching.

## Prerequisites

Before running this workflow, the project must have:

- [x] Ecological Baseline Report (Eco-Scientist)
- [x] NbS Concept Note and Monitoring Framework (Regen-Architect)
- [x] Constraint Map and Site Characterization (GIS Analyst)
- [x] Credit Feasibility Assessment and Financial Model (Green Financier)
- [x] Regulatory Memo (Legal Compliance)

If any prerequisite is missing, route back to the New Project workflow.

## Workflow Phases

### Phase 1 — Risk Underwriting
**Agent**: Underwriter
**Duration**: 1-2 days

| Step | Action | Output |
|---|---|---|
| 1.1 | Assess physical climate hazards for site | Physical Hazard Assessment |
| 1.2 | Score ecological delivery risk from baseline | Component score |
| 1.3 | Evaluate regulatory and political risk from Legal memo | Component score |
| 1.4 | Assess financial performance risk from Green Financier model | Component score |
| 1.5 | Calculate ESW Risk Score (0-100) | ESW Risk Score |
| 1.6 | Model insurance/risk transfer options | Insurance & Risk Transfer Memo |
| 1.7 | Produce Investor Risk Rating | Investor Risk Rating |

**Gate**: If ESW Risk Score < 40 (Unbankable) → STOP. Return to Project Controller with remediation requirements.

```
HANDOFF → Deal Structurer: Risk underwriting complete. ESW Risk Score: [X]/100.
Proceed to deal structuring.
```

### Phase 2 — Deal Structuring
**Agent**: Deal Structurer
**Duration**: 2-3 days

| Step | Action | Output |
|---|---|---|
| 2.1 | Calculate ESW Bankability Score (IRR + Regulatory + Ecological) | ESW Bankability Score |
| 2.2 | Design capital stack and SPV structure | Capital Stack Design |
| 2.3 | Build revenue waterfall model | Revenue Waterfall |
| 2.4 | Draft indicative term sheet | Draft Term Sheet |
| 2.5 | Match project to investor profiles | Investor Profile Match |
| 2.6 | Assemble due diligence package from all agent outputs | Due Diligence Package |

**Gate**: If ESW Bankability Score < 25 (Not Viable) → STOP. Return to Project Controller.

```
HANDOFF → Legal Compliance: Review draft term sheet and SPV structure.
```

### Phase 3 — Legal Review
**Agent**: Legal Compliance
**Duration**: 1-2 days

| Step | Action | Output |
|---|---|---|
| 3.1 | Review term sheet for legal compliance | Annotated Term Sheet |
| 3.2 | Validate SPV jurisdiction and governance | SPV Legal Opinion |
| 3.3 | Review credit purchase agreement terms | Contract Review |
| 3.4 | Confirm regulatory clearance for proposed structure | Clearance Status |

**Gate**: Legal must issue Cleared or Conditionally Cleared status.

```
HANDOFF → Project Controller: Deal package legally reviewed. Clearance: [status].
```

### Phase 4 — Package & Handoff
**Agent**: Project Controller
**Duration**: 1 day

| Step | Action | Output |
|---|---|---|
| 4.1 | Compile all outputs into ESW Deal Package | Complete Package |
| 4.2 | Produce Executive Summary (1-2 pages) | Executive Summary |
| 4.3 | Brief Growth Hacker on target investors | Outreach Brief |

```
HANDOFF → Growth Hacker: Deal package ready. Target investor profile: [type].
ESW Bankability Score: [X]/100. Begin outreach.
```

## ESW Deal Package — Table of Contents

The final deliverable is a consolidated package containing:

| # | Document | Pages | Source |
|---|---|---|---|
| 1 | Executive Summary | 1-2 | Project Controller |
| 2 | ESW Bankability Score Card | 1 | Deal Structurer |
| 3 | ESW Risk Score Card | 1 | Underwriter |
| 4 | Ecological Baseline Summary | 3-5 | Eco-Scientist |
| 5 | NbS Design & Monitoring Plan | 3-5 | Regen-Architect |
| 6 | Site Characterization & Maps | 2-4 | GIS Analyst |
| 7 | Financial Model | 2-3 | Green Financier |
| 8 | Insurance & Risk Transfer Memo | 1-2 | Underwriter |
| 9 | Regulatory & Legal Review | 2-3 | Legal Compliance |
| 10 | Draft Term Sheet | 2-3 | Deal Structurer |
| 11 | Revenue Waterfall | 1 | Deal Structurer |
| 12 | Investor Profile Match | 1 | Deal Structurer |

**Total estimated package: 20-30 pages.**

## Scoring Reference

### ESW Bankability Score

```
Score = (IRR_Potential × 0.4) + (Regulatory_Certainty × 0.3) + (Ecological_Integrity × 0.3)
```

Each component is scored 0-100 by the responsible agent:

| Component | Scoring Agent | Basis |
|---|---|---|
| IRR Potential | Green Financier | Conservative IRR vs. market benchmarks |
| Regulatory Certainty | Legal Compliance | Permitting clarity, regulatory stability, disclosure readiness |
| Ecological Integrity | Eco-Scientist + Underwriter | Baseline quality, delivery risk, permanence |

### ESW Risk Score

```
Score = (Physical_Hazard × 0.25) + (Ecological_Delivery × 0.25) + (Regulatory_Political × 0.20) + (Financial_Performance × 0.20) + (Counterparty_Execution × 0.10)
```

Note: Risk Score is inverted — higher = lower risk = better. A project with Risk Score 85 has minimal risk.

## Timeline

| Configuration | Total Duration |
|---|---|
| Standard | 5-8 business days |
| Express (pre-assessed projects) | 2-3 business days |
| Complex (multi-jurisdiction, blended finance) | 10-15 business days |
