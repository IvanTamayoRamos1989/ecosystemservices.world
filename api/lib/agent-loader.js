import { readFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Resolve agents directory — try relative path first, fall back to process.cwd()
const AGENTS_DIR = existsSync(join(__dirname, '..', '..', 'agents'))
  ? join(__dirname, '..', '..', 'agents')
  : join(process.cwd(), 'agents')

let agentCache = null
let workflowCache = null

/**
 * Load all agent definitions from the agents/ directory.
 * Returns a Map of agentId → { id, name, layer, focus, prompt }
 */
export async function loadAgents() {
  if (agentCache) return agentCache

  const systemPrompt = await readFile(join(AGENTS_DIR, 'system.md'), 'utf-8')
  const files = await readdir(AGENTS_DIR)
  const agentFiles = files.filter(f => f.endsWith('.md') && f !== 'system.md' && f !== 'README.md')

  const agents = new Map()

  for (const file of agentFiles) {
    const content = await readFile(join(AGENTS_DIR, file), 'utf-8')
    const id = file.replace('.md', '')
    const name = extractName(content)
    const layer = extractLayer(content)
    const focus = extractFocus(content)

    agents.set(id, {
      id,
      name,
      layer,
      focus,
      // Full prompt = shared system context + agent-specific prompt
      prompt: systemPrompt + '\n\n---\n\n' + content,
    })
  }

  agentCache = agents
  return agents
}

/**
 * Load all workflow definitions from agents/workflows/
 */
export async function loadWorkflows() {
  if (workflowCache) return workflowCache

  const workflowDir = join(AGENTS_DIR, 'workflows')
  const files = await readdir(workflowDir)
  const workflowFiles = files.filter(f => f.endsWith('.md'))

  const workflows = new Map()

  for (const file of workflowFiles) {
    const content = await readFile(join(workflowDir, file), 'utf-8')
    const id = file.replace('.md', '')
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
  return readFile(join(AGENTS_DIR, 'system.md'), 'utf-8')
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
  // Try "Focus: The ..." pattern first
  const match = content.match(/Focus:\s*(.+)/m)
  if (match) return match[1].trim().replace(/\.$/, '')

  // Fall back to extracting from the subtitle line: "> Layer N — Dept. The Something."
  const subtitleMatch = content.match(/>\s*Layer\s+\d+\s*[—–-]\s*.+?\.\s*(.+?)\.?\s*$/m)
  if (subtitleMatch) return subtitleMatch[1].trim()

  return 'General'
}
