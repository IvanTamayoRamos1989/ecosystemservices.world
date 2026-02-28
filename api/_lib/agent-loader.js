/**
 * ESW Agent Loader
 *
 * Loads agent definitions from the build-time generated agents-data.js module.
 * No filesystem access — all data is embedded at build time by scripts/bundle-agents.js.
 */
import { SYSTEM_PROMPT, AGENT_FILES, WORKFLOW_FILES } from './agents-data.js'

let agentCache = null
let workflowCache = null

/**
 * Load all agent definitions.
 * Returns a Map of agentId → { id, name, layer, focus, prompt }
 */
export async function loadAgents() {
  if (agentCache) return agentCache

  const agents = new Map()

  for (const { id, content } of AGENT_FILES) {
    const name = extractName(content)
    const layer = extractLayer(content)
    const focus = extractFocus(content)

    agents.set(id, {
      id,
      name,
      layer,
      focus,
      prompt: SYSTEM_PROMPT + '\n\n---\n\n' + content,
    })
  }

  agentCache = agents
  return agents
}

/**
 * Load all workflow definitions from bundled data.
 */
export async function loadWorkflows() {
  if (workflowCache) return workflowCache

  const workflows = new Map()

  for (const { id, content } of WORKFLOW_FILES) {
    workflows.set(id, { id, content })
  }

  workflowCache = workflows
  return workflows
}

/**
 * Get a single agent by ID with full system prompt.
 */
export async function getAgent(agentId) {
  const agents = await loadAgents()
  return agents.get(agentId) || null
}

/**
 * Get the system-level prompt (shared context for all agents).
 */
export async function getSystemPrompt() {
  return SYSTEM_PROMPT
}

/**
 * Get agent registry as a summary (for routing decisions).
 */
export async function getAgentRegistry() {
  const agents = await loadAgents()
  return Array.from(agents.values()).map(a => ({
    id: a.id,
    name: a.name,
    layer: a.layer,
    focus: a.focus,
  }))
}

function extractName(content) {
  const match = content.match(/^#\s+(.+)/m)
  return match ? match[1].trim() : 'Unknown'
}

function extractLayer(content) {
  const match = content.match(/>\s*Layer\s+(\d+)\s*[—–-]\s*(.+?)\./m)
  return match ? `Layer ${match[1]} — ${match[2].trim()}` : 'Unknown'
}

function extractFocus(content) {
  const match = content.match(/Focus:\s*(.+)/m)
  if (match) return match[1].trim().replace(/\.$/, '')

  const subtitleMatch = content.match(/>\s*Layer\s+\d+\s*[—–-]\s*(.+?)\.\s*$/m)
  if (subtitleMatch) return subtitleMatch[1].trim()

  return 'General'
}
