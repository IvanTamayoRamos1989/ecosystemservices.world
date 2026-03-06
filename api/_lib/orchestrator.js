import Anthropic from '@anthropic-ai/sdk'
import { loadAgents, getAgent, getAgentRegistry } from './agent-loader.js'
import { routeQuery, detectHandoff } from './router.js'

// Lazy-init: avoid crashing the serverless function if ANTHROPIC_API_KEY is missing
let _client = null
function getClient() {
  if (!_client) {
    _client = new Anthropic()
  }
  return _client
}

// In-memory session store (replace with Redis/DB for production)
const sessions = new Map()

const MAX_SESSION_AGE_MS = 2 * 60 * 60 * 1000 // 2 hours

/**
 * ESW Orchestrator
 *
 * This is the brain of the ESW.AI chatbot. It:
 * 1. Routes queries to the right specialist agent(s)
 * 2. Constructs system prompts from the agent library
 * 3. Manages conversation history per session
 * 4. Handles multi-agent handoffs
 * 5. Streams responses back to the frontend
 */

/**
 * Build the orchestrator system prompt that wraps agent-specific context.
 */
function buildOrchestratorPrompt(agentPrompt, agentName, registry) {
  const registrySummary = registry
    .map(a => `- **${a.name}** (${a.id}): ${a.focus} [${a.layer}]`)
    .join('\n')

  return `${agentPrompt}

---

## ESW.AI Interface Context

You are responding through the ESW.AI web interface — the client-facing intelligence engine of Ecosystem Services World. The user is a potential or existing client.

### Your Current Role: ${agentName}

### Available ESW Specialists
When your analysis requires input from another department, use the HANDOFF protocol. These specialists are available:

${registrySummary}

### Web Search — Live Information Gathering
You have access to a **web_search** tool. Use it proactively to:
- Verify current carbon credit prices, regulatory updates, and market data
- Look up jurisdiction-specific laws, permitting requirements, and policy changes
- Find recent scientific publications, species data, and conservation status
- Check current financing rates, green bond issuances, and fund eligibility criteria
- Research site-specific conditions, climate data, and project precedents

**Always search** when the query involves current data, specific jurisdictions, or verifiable facts. Cite URLs from search results in your response.

### Response Guidelines for ESW.AI
1. **Be direct and professional.** You represent a global advisory firm, not a chatbot.
2. **Structure your responses.** Use headers, tables, and bullet points. Clients expect deliverable-grade output.
3. **Cite frameworks.** Reference CSRD, TNFD, ISSB, EU Taxonomy, Verra, Gold Standard, and other standards where relevant.
4. **Identify jurisdiction.** Always ask for or acknowledge the applicable regulatory context.
5. **Be honest about limitations.** If you need more information, specify exactly what you need and why.
6. **Use HANDOFF → syntax** when another specialist's input would strengthen the analysis. The system will route accordingly.
7. **Never fabricate data.** Use "estimated", "projected", or "indicative" when providing ranges. Cite sources and URLs.
8. **End with a clear next step.** Tell the client what you need from them or what ESW will do next.`
}

/**
 * Get or create a session.
 */
function getSession(sessionId) {
  // Prune expired sessions
  const now = Date.now()
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > MAX_SESSION_AGE_MS) {
      sessions.delete(id)
    }
  }

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      messages: [],
      activeAgent: null,
      agentHistory: [],
      lastActivity: now,
    })
  }

  const session = sessions.get(sessionId)
  session.lastActivity = now
  return session
}

/**
 * Process a user message and return a streaming response.
 *
 * @param {string} sessionId - Session identifier
 * @param {string} userMessage - The user's message
 * @param {Array} files - Attached file metadata (if any)
 * @returns {AsyncGenerator} Yields response chunks with metadata
 */
export async function* processMessage(sessionId, userMessage, files = []) {
  const session = getSession(sessionId)
  const registry = await getAgentRegistry()

  // Add file context to message if files are attached
  let enrichedMessage = userMessage
  if (files && files.length > 0) {
    const fileList = files.map(f => `${f.name} (${f.type}, ${f.size} bytes)`).join(', ')
    enrichedMessage += `\n\n[Attached documents: ${fileList}]`
  }

  // Route the query to the appropriate agent
  const routing = routeQuery(enrichedMessage, {
    activeAgent: session.activeAgent,
    history: session.agentHistory,
  })

  // Load the primary agent
  const primaryAgent = await getAgent(routing.primary)
  if (!primaryAgent) {
    yield { type: 'error', content: 'Agent routing failed. Please try again.' }
    return
  }

  // Build the system prompt
  const systemPrompt = buildOrchestratorPrompt(
    primaryAgent.prompt,
    primaryAgent.name,
    registry
  )

  // Track which agent is responding
  session.activeAgent = routing.primary
  if (!session.agentHistory.includes(routing.primary)) {
    session.agentHistory.push(routing.primary)
  }

  // Yield routing metadata
  yield {
    type: 'meta',
    agent: {
      id: primaryAgent.id,
      name: primaryAgent.name,
      layer: primaryAgent.layer,
      focus: primaryAgent.focus,
    },
    supporting: routing.supporting,
    isNewProject: routing.isNewProject,
  }

  // Add user message to conversation history
  session.messages.push({ role: 'user', content: enrichedMessage })

  // Keep conversation history manageable (last 20 messages)
  const conversationMessages = session.messages.slice(-20)

  // Call Claude API with streaming + web search for live information gathering
  const stream = getClient().messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16384,
    system: systemPrompt,
    messages: conversationMessages,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 5,
      },
    ],
  })

  let fullResponse = ''
  let searchCount = 0

  for await (const event of stream) {
    // Text content from the model
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      const text = event.delta.text
      fullResponse += text
      yield { type: 'text', content: text }
    }

    // Detect when the model initiates a web search
    if (event.type === 'content_block_start' && event.content_block?.type === 'server_tool_use') {
      searchCount++
      yield { type: 'status', content: `Searching the web${searchCount > 1 ? ` (${searchCount})` : ''}...` }
    }
  }

  // Store assistant response in session
  session.messages.push({ role: 'assistant', content: fullResponse })

  // Check for handoffs in the response
  const handoffs = detectHandoff(fullResponse)
  if (handoffs) {
    yield {
      type: 'handoffs',
      handoffs: handoffs.map(h => ({
        targetAgent: h.targetAgent,
        request: h.request,
      })),
    }
  }

  // Yield completion signal
  yield { type: 'done' }
}

/**
 * Non-streaming version for simpler use cases.
 */
export async function processMessageSync(sessionId, userMessage, files = []) {
  const chunks = []
  let meta = null
  let handoffs = null

  for await (const chunk of processMessage(sessionId, userMessage, files)) {
    if (chunk.type === 'meta') meta = chunk
    else if (chunk.type === 'text') chunks.push(chunk.content)
    else if (chunk.type === 'handoffs') handoffs = chunk.handoffs
  }

  return {
    agent: meta?.agent,
    content: chunks.join(''),
    handoffs,
  }
}

/**
 * Clear a session's conversation history.
 */
export function clearSession(sessionId) {
  sessions.delete(sessionId)
}

/**
 * Get session info (for debugging/admin).
 */
export function getSessionInfo(sessionId) {
  const session = sessions.get(sessionId)
  if (!session) return null
  return {
    id: session.id,
    messageCount: session.messages.length,
    activeAgent: session.activeAgent,
    agentHistory: session.agentHistory,
    lastActivity: session.lastActivity,
  }
}
