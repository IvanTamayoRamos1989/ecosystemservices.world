import { cors } from './_lib/cors.js'

export default async function handler(req, res) {
  if (cors(req, res)) return

  try {
    const { getAgentRegistry } = await import('./_lib/agent-loader.js')
    const registry = await getAgentRegistry()
    res.status(200).json({ agents: registry })
  } catch (err) {
    console.error('Failed to load agent registry:', err)
    res.status(500).json({ error: 'Failed to load agent registry' })
  }
}
