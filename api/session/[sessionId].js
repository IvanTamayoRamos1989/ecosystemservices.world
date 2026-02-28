import { cors } from '../_lib/cors.js'

export default async function handler(req, res) {
  if (cors(req, res)) return

  const { sessionId } = req.query

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' })
  }

  const { clearSession, getSessionInfo } = await import('../_lib/orchestrator.js')

  if (req.method === 'DELETE') {
    clearSession(sessionId)
    return res.status(200).json({ status: 'cleared' })
  }

  if (req.method === 'GET') {
    const info = getSessionInfo(sessionId)
    if (!info) return res.status(404).json({ error: 'Session not found' })
    return res.status(200).json(info)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
