/**
 * ESW.AI API — Single Vercel Serverless Function
 *
 * All API routes are handled by this single function.
 * Vercel rewrites route /api/* requests here.
 */

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  // Parse the route from the URL
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const path = url.pathname

  try {
    // ── Health Check ───────────────────────────────────────────────
    if (path === '/api/health' || path === '/health') {
      const hasKey = !!process.env.ANTHROPIC_API_KEY
      let agentCount = 0
      try {
        const { getAgentRegistry } = await import('./_lib/agent-loader.js')
        const registry = await getAgentRegistry()
        agentCount = registry.length
      } catch (e) {
        // Agent loading failed — report but don't crash
      }
      return res.status(200).json({
        status: 'ok',
        service: 'esw-ai',
        version: '1.0.0',
        apiKeyConfigured: hasKey,
        agentsLoaded: agentCount,
      })
    }

    // ── Agent Registry ─────────────────────────────────────────────
    if (path === '/api/agents' || path === '/agents') {
      const { getAgentRegistry } = await import('./_lib/agent-loader.js')
      const registry = await getAgentRegistry()
      return res.status(200).json({ agents: registry })
    }

    // ── Chat (Streaming SSE) ───────────────────────────────────────
    if ((path === '/api/chat' || path === '/chat') && req.method === 'POST') {
      const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}')
      const { sessionId, message, files } = body

      if (!sessionId || !message) {
        return res.status(400).json({ error: 'sessionId and message are required' })
      }
      if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(503).json({ error: 'ANTHROPIC_API_KEY not configured on server' })
      }

      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('X-Accel-Buffering', 'no')

      try {
        const { processMessage } = await import('./_lib/orchestrator.js')
        for await (const chunk of processMessage(sessionId, message, files)) {
          res.write(`data: ${JSON.stringify(chunk)}\n\n`)
          if (res.flush) res.flush()
        }
      } catch (err) {
        console.error('Chat error:', err)
        res.write(`data: ${JSON.stringify({
          type: 'error',
          content: err.message?.includes('API key')
            ? 'API key error. Check ANTHROPIC_API_KEY.'
            : 'An error occurred. Please try again.',
        })}\n\n`)
      }

      res.write('data: [DONE]\n\n')
      return res.end()
    }

    // ── Session Management ─────────────────────────────────────────
    const sessionMatch = path.match(/^\/(?:api\/)?session\/(.+)$/)
    if (sessionMatch) {
      const sessionId = sessionMatch[1]
      const { clearSession, getSessionInfo } = await import('./_lib/orchestrator.js')

      if (req.method === 'DELETE') {
        clearSession(sessionId)
        return res.status(200).json({ status: 'cleared' })
      }
      const info = getSessionInfo(sessionId)
      if (!info) return res.status(404).json({ error: 'Session not found' })
      return res.status(200).json(info)
    }

    // ── 404 ────────────────────────────────────────────────────────
    return res.status(404).json({ error: 'Not found', path })

  } catch (err) {
    console.error('API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
