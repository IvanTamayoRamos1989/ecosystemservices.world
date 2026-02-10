# Workflow: Board Meeting Simulation

> Triggered on demand for strategic review, project evaluation, or decision-making.

## Purpose

Simulate a cross-functional leadership meeting where all department heads assess a project, proposal, or strategic question from their specialist perspective. This workflow produces a comprehensive, multi-angle evaluation that no single agent can provide alone.

## Trigger

A strategic question, project proposal, or decision point is raised that requires input from multiple departments.

**Example triggers:**
- "Should ESW pursue this opportunity?"
- "Evaluate this project from all angles."
- "What is our position on [regulatory development]?"
- "Review Q[N] pipeline and performance."

## Sequence

```
Phase 1: BRIEFING
  → Project Controller frames the question and distributes context
  → Each agent receives the same briefing document

Phase 2: DEPARTMENT ASSESSMENTS (parallel)
  → Eco-Scientist: ecological feasibility and risk assessment
  → Regen-Architect: technical solution viability
  → GIS Analyst: spatial constraints and data availability
  → Green Financier: financial viability and structuring options
  → Legal Compliance: regulatory landscape and legal risk
  → Growth Hacker: market positioning and pipeline impact
  → Brand Voice: reputational considerations and content opportunity

Phase 3: SYNTHESIS
  → Project Controller collects all assessments
  → Project Controller produces Board Summary with:
    - Unanimous positions (all agents agree)
    - Contested positions (agents disagree — state each view)
    - Open questions (insufficient data to assess)
    - Recommended decision with conditions

Phase 4: DECISION RECORD
  → Project Controller documents the decision and rationale
  → Action items assigned to specific agents with deadlines
```

## Agent Participation

All agents participate. Each provides a structured assessment:

| Agent | Assessment Focus | Output |
|---|---|---|
| Eco-Scientist | Ecological risk, data sufficiency, biome complexity | Feasibility rating + key risks |
| Regen-Architect | Technical solution space, intervention options | Viability rating + approach options |
| GIS Analyst | Data availability, spatial constraints, site access | Data readiness rating + gaps |
| Green Financier | Revenue potential, bankability, financial risk | Financial rating + structure options |
| Legal Compliance | Regulatory exposure, jurisdictional complexity, liability | Legal risk rating + flags |
| Growth Hacker | Market fit, competitive landscape, pipeline value | Strategic value rating |
| Brand Voice | Reputational fit, content potential, positioning | Brand alignment rating |

## Assessment Format

Each agent delivers a brief (200-400 words) structured as:

```markdown
## [Agent Name] — Board Assessment

**Subject**: [Question/project being assessed]

**Rating**: [Green / Amber / Red]

**Key findings**:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**Risks**:
- [Risk 1 with severity]

**Recommendation**: [Proceed / Proceed with conditions / Do not proceed]

**Conditions** (if applicable):
- [Condition 1]
```

## Board Summary Format

Project Controller compiles the final output:

```markdown
## ESW Board Summary

**Date**: [YYYY-MM-DD]
**Subject**: [Question/project]
**Called by**: [Who triggered the meeting]

### Consensus
[Areas where all agents agree]

### Contested
[Areas of disagreement — each position stated]

### Open Questions
[What cannot be assessed with current information]

### Decision
[Recommended action]

### Conditions
[What must be true for the decision to hold]

### Action Items
| # | Action | Owner | Deadline |
|---|---|---|---|
| 1 | | | |
```

## Standards

- Every agent must participate. No abstentions without stated reason.
- Ratings must be justified with specific evidence, not general sentiment.
- Disagreements are documented, not suppressed. The value of this workflow is multi-perspective analysis.
- The Board Summary is the authoritative record. Individual assessments are supporting documents.
