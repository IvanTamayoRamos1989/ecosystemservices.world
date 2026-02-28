/**
 * ESW.AI API — Local Development Server
 *
 * In production (Vercel), each endpoint is a separate serverless function:
 *   api/health.js  → GET  /api/health
 *   api/agents.js  → GET  /api/agents
 *   api/chat.js    → POST /api/chat
 *   api/session/[sessionId].js → GET/DELETE /api/session/:id
 *
 * This file provides an Express wrapper for local development only.
 */

import express from 'express'
import cors from 'cors'

// Import the individual serverless function handlers
import healthHandler from './health.js'
import agentsHandler from './agents.js'
import chatHandler from './chat.js'
import sessionHandler from './session/[sessionId].js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Map serverless handlers to Express routes
app.get('/api/health', healthHandler)
app.get('/api/agents', agentsHandler)
app.post('/api/chat', chatHandler)
app.get('/api/session/:sessionId', (req, res) => {
  req.query = { ...req.query, sessionId: req.params.sessionId }
  return sessionHandler(req, res)
})
app.delete('/api/session/:sessionId', (req, res) => {
  req.query = { ...req.query, sessionId: req.params.sessionId }
  return sessionHandler(req, res)
})

// Export for any tooling that expects it
export default app

// ── Local Dev Server ─────────────────────────────────────────────────
if (!process.env.VERCEL) {
  const PORT = process.env.ESW_API_PORT || 3001

  async function start() {
    const { loadAgents, getAgentRegistry } = await import('./lib/agent-loader.js')
    await loadAgents()
    const registry = await getAgentRegistry()

    app.listen(PORT, () => {
      console.log(`\n  ESW.AI API Server (Local Dev)`)
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
