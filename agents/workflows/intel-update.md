# Workflow: Intel Content Update

> Triggered quarterly or when a major sector development occurs.

## Purpose

Research, draft, and publish sector intelligence articles for the ESW website's "Intel" section. This workflow ensures the Intel feed stays current with verified, citation-backed developments across ecosystem services, regulatory frameworks, carbon/biodiversity markets, and sustainable finance.

## Trigger

- Quarterly scheduled cycle (January, April, July, October)
- Major regulatory announcement (CSRD update, TNFD milestone, new crediting methodology)
- COP or major international summit outcomes
- Significant market event (new credit framework, landmark green bond issuance)

## Sequence

```
Phase 1: RESEARCH
  → Brand Voice identifies topics requiring coverage
  → Brand Voice researches developments across these domains:
    1. EU regulation (CSRD, EU Taxonomy, ESRS, Nature Restoration Law, EUDR)
    2. Disclosure frameworks (TNFD, ISSB, IFRS S1/S2)
    3. Biodiversity credits (Verra Nature Framework, BNG, national schemes)
    4. Carbon markets (VCS, Gold Standard, Article 6, ICVCM)
    5. Nature-based Solutions policy (national NbS policies, UNEP)
    6. CBD/COP outcomes (Kunming-Montreal GBF progress)
    7. Green/sustainability-linked bonds (EuGB, ICMA, market data)
  → GATE: Research verified with primary sources

Phase 2: DRAFTING
  → Brand Voice drafts articles in the Intel format (below)
  → Each article must include: date, category, title, summary, tags
  → Eco-Scientist reviews for ecological/scientific accuracy
  → Legal Compliance reviews for regulatory accuracy
  → Green Financier reviews for financial/market accuracy
  → GATE: All reviewers confirm accuracy

Phase 3: PUBLICATION
  → Brand Voice delivers final article data to be added to
    src/components/Intel.jsx
  → New articles are prepended to the articles array (newest first)
  → Old articles (>18 months) are archived or removed
  → GATE: Build passes, content reviewed on staging
```

## Article Format

Each article in Intel.jsx follows this structure:

```javascript
{
  date: 'Month YYYY',           // e.g., 'January 2026'
  category: 'Category Name',    // One of the defined categories
  title: 'Headline (max 80 chars)',
  summary: 'Body text (2-3 sentences, max 280 chars). Factual, dense, citation-worthy.',
  tags: ['Tag1', 'Tag2', 'Tag3'],  // 2-4 tags, uppercase abbreviations preferred
  highlight: false,              // Set true for major developments only
}
```

## Categories

| Category | Covers |
|---|---|
| EU Regulation | CSRD, ESRS, EU Taxonomy, EUDR, Nature Restoration Law |
| Disclosure | TNFD, ISSB, IFRS, corporate reporting standards |
| Biodiversity Credits | Verra Nature Framework, BNG, national credit schemes |
| Carbon Markets | VCS, Gold Standard, Article 6, ICVCM, CORSIA |
| NbS Policy | Nature-based Solutions legislation, UNEP, national policies |
| COP16 / COP17 | CBD summit outcomes and follow-up |
| Green Bonds | EuGB, ICMA, SLBs, market data |

## Content Standards

1. **Verified facts only.** Every claim must be traceable to a primary source (regulation text, official announcement, credible publication). No speculation.
2. **Date-specific.** Include the exact month and year. If a specific date is known (e.g., "26 February 2025"), include it in the summary.
3. **Dense.** Summaries are 2-3 sentences maximum. No filler, no editorializing. State what happened and why it matters.
4. **Framework references.** Always name the specific regulation, standard, or methodology (e.g., "VM0047 v1.1", not "a new methodology").
5. **ESW relevance.** Every article must be relevant to ESW's service offerings. If it doesn't affect ecological assessment, NbS design, credit structuring, or disclosure advisory, it doesn't belong in Intel.
6. **No comparisons to other firms.** Intel is about the sector, not competitors.

## Review Checklist

| Check | Reviewer |
|---|---|
| Ecological/scientific claims are accurate | Eco-Scientist |
| Regulatory citations are correct and current | Legal Compliance |
| Financial/market data is accurate | Green Financier |
| Tone is institutional, not promotional | Brand Voice |
| Tags match the defined taxonomy | Brand Voice |
| No stale articles (>18 months old) remain | Brand Voice |

## Quarterly Calendar

| Quarter | Coverage Focus |
|---|---|
| Q1 (January) | Year-in-review, regulatory outlook, market forecasts |
| Q2 (April) | EU legislative cycle updates, spring summit outcomes |
| Q3 (July) | Mid-year market data, methodology updates |
| Q4 (October) | COP preparation/outcomes, year-end regulation deadlines |
