import express from 'express'
import cors from 'cors'
import { processMessage, clearSession, getSessionInfo } from './lib/orchestrator.js'
import { getAgentRegistry, loadAgents } from './lib/agent-loader.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// ── Health Check ─────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'esw-ai', version: '1.0.0' })
})

// ── Agent Registry ───────────────────────────────────────────────────
app.get('/api/agents', async (req, res) => {
  try {
    const registry = await getAgentRegistry()
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

  // Set up SSE (Server-Sent Events) for streaming
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')

  try {
    for await (const chunk of processMessage(sessionId, message, files)) {
      const data = JSON.stringify(chunk)
      res.write(`data: ${data}\n\n`)

      // Flush for immediate delivery
      if (res.flush) res.flush()
    }
  } catch (err) {
    console.error('Chat error:', err)
    const errorData = JSON.stringify({
      type: 'error',
      content: 'An error occurred processing your request. Please try again.',
    })
    res.write(`data: ${errorData}\n\n`)
  }

  res.write('data: [DONE]\n\n')
  res.end()
})

// ── Session Management ──────────────────────────────────────────────
app.delete('/api/session/:sessionId', (req, res) => {
  clearSession(req.params.sessionId)
  res.json({ status: 'cleared' })
})

app.get('/api/session/:sessionId', (req, res) => {
  const info = getSessionInfo(req.params.sessionId)
  if (!info) return res.status(404).json({ error: 'Session not found' })
  res.json(info)
})

// ── Export for Vercel ────────────────────────────────────────────────
export default app

// ── Local Dev Server ─────────────────────────────────────────────────
// Only start listening when running locally (not on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.ESW_API_PORT || 3001

  async function start() {
    await loadAgents()
    const registry = await getAgentRegistry()

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
