import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Lazy-load heavy modules to prevent serverless cold-start crashes
let _orchestrator = null
let _agentLoader = null

async function getOrchestrator() {
  if (!_orchestrator) {
    _orchestrator = await import('./lib/orchestrator.js')
  }
  return _orchestrator
}

async function getAgentLoader() {
  if (!_agentLoader) {
    _agentLoader = await import('./lib/agent-loader.js')
  }
  return _agentLoader
}

// ── Health Check ─────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  const hasKey = !!process.env.ANTHROPIC_API_KEY
  let agentCount = 0
  try {
    const loader = await getAgentLoader()
    const registry = await loader.getAgentRegistry()
    agentCount = registry.length
  } catch (e) {
    // Agent loading failed — report but don't crash health check
  }
  res.json({
    status: 'ok',
    service: 'esw-ai',
    version: '1.0.0',
    apiKeyConfigured: hasKey,
    agentsLoaded: agentCount,
  })
})

// ── Agent Registry ───────────────────────────────────────────────────
app.get('/api/agents', async (req, res) => {
  try {
    const loader = await getAgentLoader()
    const registry = await loader.getAgentRegistry()
    res.json({ agents: registry })
  } catch (err) {
    console.error('Failed to load agent registry:', err)
    res.status(500).json({ error: 'Failed to load agent registry' })
  }
})

// ── Chat (Streaming) ────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { sessionId, message, files } = req.body

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'ANTHROPIC_API_KEY not configured on server' })
  }

  // Set up SSE (Server-Sent Events) for streaming
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  try {
    const orchestrator = await getOrchestrator()
    for await (const chunk of orchestrator.processMessage(sessionId, message, files)) {
      const data = JSON.stringify(chunk)
      res.write(`data: ${data}\n\n`)

      // Flush for immediate delivery
      if (res.flush) res.flush()
    }
  } catch (err) {
    console.error('Chat error:', err)
    const errorData = JSON.stringify({
      type: 'error',
      content: err.message?.includes('API key')
        ? 'API key error. Please check your ANTHROPIC_API_KEY configuration.'
        : 'An error occurred processing your request. Please try again.',
    })
    res.write(`data: ${errorData}\n\n`)
  }

  res.write('data: [DONE]\n\n')
  res.end()
})

// ── Session Management ──────────────────────────────────────────────
app.delete('/api/session/:sessionId', async (req, res) => {
  try {
    const orchestrator = await getOrchestrator()
    orchestrator.clearSession(req.params.sessionId)
    res.json({ status: 'cleared' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear session' })
  }
})

app.get('/api/session/:sessionId', async (req, res) => {
  try {
    const orchestrator = await getOrchestrator()
    const info = orchestrator.getSessionInfo(req.params.sessionId)
    if (!info) return res.status(404).json({ error: 'Session not found' })
    res.json(info)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get session info' })
  }
})

// ── Export for Vercel ────────────────────────────────────────────────
export default app

// ── Local Dev Server ─────────────────────────────────────────────────
// Only start listening when running locally (not on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.ESW_API_PORT || 3001

  async function start() {
    const loader = await getAgentLoader()
    await loader.loadAgents()
    const registry = await loader.getAgentRegistry()

    app.listen(PORT, () => {
      console.log(`\n  ESW.AI API Server`)
      console.log(`  ─────────────────────────────`)
      console.log(`  Port:    ${PORT}`)
      console.log(`  Agents:  ${registry.length} loaded`)
      console.log(`  Status:  Ready\n`)
      console.log(`  Agents online:`)
      for (const agent of registry) {
        console.log(`    • ${agent.name} — ${agent.focus}`)
      }
      console.log()
    })
  }

  start().catch(err => {
    console.error('Failed to start ESW.AI API:', err)
    process.exit(1)
  })
}
