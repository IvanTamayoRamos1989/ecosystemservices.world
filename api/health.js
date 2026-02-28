import { cors } from './lib/cors.js'

export default async function handler(req, res) {
  if (cors(req, res)) return

  const hasKey = !!process.env.ANTHROPIC_API_KEY
  let agentCount = 0

  try {
    const { getAgentRegistry } = await import('./lib/agent-loader.js')
    const registry = await getAgentRegistry()
    agentCount = registry.length
  } catch (e) {
    // Agent loading failed — report but don't crash health check
  }

  res.status(200).json({
    status: 'ok',
    service: 'esw-ai',
    version: '1.0.0',
    apiKeyConfigured: hasKey,
    agentsLoaded: agentCount,
  })
}
