# Workflow: Deal Matching

> Match bankable projects to investor mandates.

## Purpose

This workflow is run by the Deal Structurer and Growth Hacker to systematically match ESW deal packages with investor categories. It operates after the Bankability Assessment workflow has produced a scored, packaged project.

## Inputs

- ESW Deal Package (from Bankability Assessment workflow)
- ESW Bankability Score and Risk Score
- Investor Profile Match (from Deal Structurer)

## Matching Framework

### Step 1 — Project Classification

Classify the project on these dimensions:

| Dimension | Options |
|---|---|
| Geography | EU, US, LATAM, APAC, Africa, MENA, Multi-jurisdiction |
| Biome | Mediterranean, Tropical, Boreal, Arid, Coastal, Temperate, Wetland |
| Sector | Solar, Wind, Infrastructure, Agriculture, Mining, Restoration, Blue Carbon |
| Ticket Size | Micro (<$1M), Small ($1-10M), Medium ($10-50M), Large ($50-200M), Mega (>$200M) |
| Return Profile | Concessional (<3%), Impact (3-6%), Market (6-10%), High (>10%) |
| Impact Theme | Climate Mitigation, Climate Adaptation, Biodiversity, Water, SDG-aligned |
| Credit Type | Carbon, Biodiversity, Stacked (both), None (bond/loan only) |
| ESW Rating | Deal-ready, Conditionally bankable, Pre-development |

### Step 2 — Investor Category Matching

Match project dimensions against investor mandates:

| Investor Category | Typical Ticket | Return Target | Risk Appetite | Geography Pref | Impact Req |
|---|---|---|---|---|---|
| Multilateral DFI | $10-200M | Concessional | Low | Global | SDG-aligned |
| Bilateral DFI | $5-100M | Concessional-Impact | Low-Med | Regional | Country strategy |
| Green Bond Fund | $20-500M | Market | Low | Developed mkts | EU Taxonomy |
| Pension Fund | $50-500M | Market | Very Low | OECD | ESG mandate |
| Insurance Balance Sheet | $10-100M | Market | Low | OECD | TNFD-aligned |
| Impact Fund | $1-50M | Impact | Medium | Global | Theory of change |
| Family Office (Impact) | $1-20M | Impact-Market | Med-High | Flexible | Mission-aligned |
| Carbon Credit Buyer | $0.5-10M | N/A (offtake) | Medium | Global | Scope 3 offset |
| Biodiversity Credit Buyer | $0.5-5M | N/A (offtake) | Medium | EU/UK focus | CSRD/BNG |
| Philanthropic / Grant | $0.1-5M | Concessional/None | High | Global | Catalytic |

### Step 3 — Blended Finance Architecture

For projects that are not fully market-rate, design a capital stack using multiple investor types:

```
Layer 1 (First-Loss):     Grant / Philanthropic / DFI guarantee
Layer 2 (Mezzanine):      Impact fund / DFI loan
Layer 3 (Senior):         Green bond / Pension / Insurance
Layer 4 (Credit Offtake): Carbon/biodiversity credit pre-purchase
```

Each layer absorbs different risk:
- First-loss unlocks pension/insurance capital by de-risking
- Mezzanine provides patient capital at below-market rates
- Senior tranche gets investment-grade returns with downside protection
- Credit offtake provides revenue certainty for the financial model

### Step 4 — Outreach Brief

**Agent**: Growth Hacker

Produce an outreach brief with:

| Field | Content |
|---|---|
| Project one-liner | [50 words max] |
| ESW Bankability Score | [X/100] |
| Ticket size sought | [$X-Y] |
| Return target | [X%] |
| Impact headline | [Primary outcome: ha restored, tCO2e, species protected] |
| Target investor categories | [From Step 2] |
| Recommended approach | [Direct, event, introduction, RFP response] |
| Urgency | [Open / Time-sensitive / Closing] |

## Handoff

```
HANDOFF → Growth Hacker: Deal matching complete. [N] investor categories identified.
Priority targets: [list]. Outreach brief attached. Begin outreach sequence per
Lead Generation workflow.
```

```
HANDOFF → Brand Voice: Prepare investor-facing one-pager for [Project Name].
Target audience: [investor categories]. Key metrics: [Bankability Score, headline impact].
```

```
HANDOFF → Project Controller: Deal matching complete. [N] target categories,
[M] potential leads identified. Outreach commencing.
```

## Success Metrics

| Metric | Target |
|---|---|
| Matches per project | 3-5 investor categories |
| Outreach to first meeting | <14 days |
| Due diligence requests | >1 per project |
| Term sheet issued | Within 90 days of outreach |
