# ESW Multi-Agent System

## Architecture

Each `.md` file in this directory is a complete system prompt for one specialist agent.
These are designed to be loaded into any LLM session (Claude, GPT, etc.) as system instructions.

## How to Use

**Single agent**: Copy the contents of any agent file and paste it as the system prompt
in a new LLM session. Then provide your task as the first user message.

**Multi-agent workflow**: Use the workflow files in `workflows/` which orchestrate
multiple agents in sequence. Load the workflow prompt, and it will instruct you on
which agents to invoke and in what order.

**In Claude Code**: Reference agent files directly:
```
Read agents/eco-scientist.md, then apply that role to analyze [site data].
```

## Agent Registry

| File | Role | Layer | Focus |
|---|---|---|---|
| `system.md` | Shared context | — | Loaded by all agents |
| `project-controller.md` | COO / PM | 1 — Operations | Orchestration |
| `eco-scientist.md` | Lead Ecologist | 2 — Technical | The Problem |
| `regen-architect.md` | Design Lead | 2 — Technical | The Solution |
| `gis-analyst.md` | Spatial Data | 2 — Technical | The Location |
| `green-financier.md` | CFO | 3 — Commercial | The Value |
| `legal-compliance.md` | General Counsel | 3 — Legal | The Risk |
| `growth-hacker.md` | Sales Lead | 4 — Growth | The Pipeline |
| `brand-voice.md` | Marketing | 4 — Growth | The Reputation |
| `agent-architect.md` | HR / System | 0 — Meta | The System |

## Workflow Registry

| File | Purpose |
|---|---|
| `workflows/new-project.md` | Full project intake and phase execution |
| `workflows/board-meeting.md` | Cross-agent simulation for a given project |
| `workflows/lead-generation.md` | Target identification and outreach |
| `workflows/intel-update.md` | Quarterly sector intelligence for website |

## Design Principles

1. **Each agent has a single focus.** No generalists.
2. **Inputs and outputs are explicit.** Every agent declares what it expects and what it produces.
3. **Handoffs are named.** Agents reference each other by role, not by generic delegation.
4. **All outputs are professional and citation-backed.** No filler. No speculation without disclosure.
5. **Jurisdiction is never assumed.** Every agent identifies and applies the relevant local context.
