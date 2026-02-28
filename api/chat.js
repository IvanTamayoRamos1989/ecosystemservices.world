import { cors, parseBody } from './_lib/cors.js'

export default async function handler(req, res) {
  if (cors(req, res)) return

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = await parseBody(req)
  const { sessionId, message, files } = body

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
    const { processMessage } = await import('./_lib/orchestrator.js')

    for await (const chunk of processMessage(sessionId, message, files)) {
      const data = JSON.stringify(chunk)
      res.write(`data: ${data}\n\n`)

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
}
