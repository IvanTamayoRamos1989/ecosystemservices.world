/**
 * Local development server — wraps the Vercel serverless handler
 * in an Express app so `npm run api` works outside Vercel.
 */

import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })
import express from 'express'
import handler from './index.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

// Adapt Express req/res to match what the handler expects
app.all('/api/*', (req, res) => handler(req, res))
app.all('/*', (req, res) => {
  // Prefix with /api so the handler's path matching works
  req.url = `/api${req.url}`
  handler(req, res)
})

app.listen(PORT, () => {
  console.log(`ESW API dev server running at http://localhost:${PORT}`)
  console.log(`  Health:  http://localhost:${PORT}/api/health`)
  console.log(`  Chat:    POST http://localhost:${PORT}/api/chat`)
  console.log(`  API key: ${process.env.ANTHROPIC_API_KEY ? 'configured' : 'MISSING — set ANTHROPIC_API_KEY in api/.env'}`)
})
