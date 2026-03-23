import React, { useState, useRef, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_ESW_API_URL || '/api'

const SYSTEM_GREETING = {
  role: 'assistant',
  content: `Welcome to **ESW.AI** — the intelligent project structuring engine for nature-based infrastructure finance.

I connect you directly to ESW's multi-agent system — a team of specialist AI agents covering ecology, design, finance, legal, and spatial analysis.

**What I can do:**
- Analyse your project site and context
- Design Nature-Based Solutions tailored to your biome and jurisdiction
- Structure blended finance capital stacks
- Prepare CSRD / TNFD / ISSB compliance frameworks
- Estimate carbon and biodiversity credit potential
- Draft bankability assessments

**To get started**, describe your project or upload relevant documents (site plans, EIA reports, financial summaries).`,
  agent: { name: 'Project Controller', id: 'project-controller', focus: 'Orchestration' },
}

const SUGGESTED_PROMPTS = [
  'I have a 500-hectare coastal restoration project in Southeast Asia. What financing instruments are available?',
  'We need to structure a TNFD-compliant biodiversity assessment for a solar farm in Southern Europe.',
  'Help me design a blended finance capital stack for urban green infrastructure in Latin America.',
  'What are the carbon credit certification options for a mangrove restoration project?',
]

// Agent display names and abbreviations
const AGENT_LABELS = {
  'project-controller': { abbr: 'PM', color: 'bg-navy' },
  'eco-scientist': { abbr: 'ECO', color: 'bg-emerald-700' },
  'regen-architect': { abbr: 'NbS', color: 'bg-teal-700' },
  'gis-analyst': { abbr: 'GIS', color: 'bg-blue-700' },
  'green-financier': { abbr: 'FIN', color: 'bg-amber-700' },
  'legal-compliance': { abbr: 'LAW', color: 'bg-rose-800' },
  'brand-voice': { abbr: 'MKT', color: 'bg-violet-700' },
  'growth-hacker': { abbr: 'BIZ', color: 'bg-orange-700' },
  'agent-architect': { abbr: 'SYS', color: 'bg-slate-700' },
  'talent-scout': { abbr: 'HR', color: 'bg-cyan-700' },
  'procurement-manager': { abbr: 'PRO', color: 'bg-indigo-700' },
}

function generateSessionId() {
  return 'esw-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

function ESWChat({ onClose }) {
  const [messages, setMessages] = useState([SYSTEM_GREETING])
  const [input, setInput] = useState('')
  const [files, setFiles] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [activeAgent, setActiveAgent] = useState(null)
  const [streamingContent, setStreamingContent] = useState('')
  const [searchStatus, setSearchStatus] = useState(null)
  const [sessionId] = useState(() => generateSessionId())
  const [apiConnected, setApiConnected] = useState(null) // null = unknown, true/false
  const [connectionError, setConnectionError] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const abortControllerRef = useRef(null)

  // Check API health — retry up to 5 times with backoff
  const checkHealth = useCallback(async () => {
    setApiConnected(null)
    setConnectionError(null)
    let lastErr = null
    for (let attempt = 0; attempt < 6; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt))
      try {
        const res = await fetch(`${API_URL}/health`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        console.log('[ESW.AI] API connected:', data)
        setApiConnected(true)
        setConnectionError(null)
        return
      } catch (err) {
        lastErr = err
        console.warn(`[ESW.AI] Health check attempt ${attempt + 1}/6 failed:`, err.message)
      }
    }
    console.error('[ESW.AI] API unreachable after 6 attempts:', lastErr?.message)
    setApiConnected(false)
    setConnectionError(lastErr?.message || 'Cannot reach API')
  }, [])

  useEffect(() => { checkHealth() }, [checkHealth])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, streamingContent])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px'
    }
  }, [input])

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles])
    e.target.value = ''
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const handleSend = useCallback(async (text) => {
    const messageText = text || input.trim()
    if (!messageText && files.length === 0) return

    const userMessage = {
      role: 'user',
      content: messageText,
      files: files.length > 0 ? files.map((f) => ({ name: f.name, size: f.size, type: f.type })) : null,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setFiles([])
    setIsTyping(true)
    setStreamingContent('')
    setActiveAgent(null)

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    // Always attempt the API — even if the health check failed earlier.
    // A successful response flips status to "Connected".
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: messageText,
          files: userMessage.files,
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''
      let agentInfo = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process SSE events in buffer
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)

          if (data === '[DONE]') continue

          try {
            const chunk = JSON.parse(data)

            switch (chunk.type) {
              case 'meta':
                agentInfo = chunk.agent
                setActiveAgent(agentInfo)
                break

              case 'text':
                fullContent += chunk.content
                setStreamingContent(fullContent)
                break

              case 'status':
                setSearchStatus(chunk.content)
                break

              case 'handoffs':
                // Handoffs are informational — the system will route automatically
                break

              case 'error':
                throw new Error(chunk.content)
            }
          } catch (parseErr) {
            if (parseErr.message && !parseErr.message.includes('JSON')) {
              throw parseErr
            }
          }
        }
      }

      // Finalize: move streaming content into messages
      if (fullContent) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: fullContent, agent: agentInfo },
        ])
      }

      setStreamingContent('')
      setSearchStatus(null)
      setIsTyping(false)
      setActiveAgent(null)
      setApiConnected(true)
    } catch (err) {
      if (err.name === 'AbortError') return

      console.error('ESW.AI API error:', err)

      // Fall back to local response on API failure
      setStreamingContent('')
      setApiConnected(false)
      handleLocalResponse(messageText, userMessage.files)
    }
  }, [input, files, sessionId, apiConnected])

  const handleLocalResponse = (messageText, attachedFiles) => {
    setTimeout(() => {
      const response = generateLocalResponse(messageText, attachedFiles)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response, agent: { name: 'ESW.AI', id: 'system', focus: 'General' } },
      ])
      setIsTyping(false)
    }, 800 + Math.random() * 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewChat = useCallback(() => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setMessages([SYSTEM_GREETING])
    setFiles([])
    setInput('')
    setStreamingContent('')
    setIsTyping(false)
    setActiveAgent(null)

    // Clear server-side session
    if (apiConnected) {
      fetch(`${API_URL}/session/${sessionId}`, { method: 'DELETE' }).catch(() => {})
    }
  }, [sessionId, apiConnected])

  const showSuggestions = messages.length === 1

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-sovereign-silver bg-white flex-shrink-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-slate hover:text-navy transition-colors p-1"
              aria-label="Back to website"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-navy flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xs">AI</span>
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-navy leading-none">ESW.AI</h1>
                <span className="text-[10px] uppercase tracking-widest text-slate">Multi-Agent Intelligence Engine</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={apiConnected !== true ? checkHealth : undefined}
              className="hidden sm:flex items-center gap-2 text-xs text-slate hover:text-navy transition-colors"
              title={connectionError ? `Error: ${connectionError} — click to retry` : apiConnected === false ? 'Click to retry connection' : ''}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${apiConnected === true ? 'bg-emerald-500' : apiConnected === false ? 'bg-amber-500' : 'bg-sovereign-steel'} ${apiConnected === null ? 'animate-pulse' : ''}`} />
              {apiConnected === true ? 'Connected' : apiConnected === false ? 'Local Mode — click to retry' : 'Connecting...'}
            </button>
            <button
              onClick={handleNewChat}
              className="text-xs text-slate hover:text-navy transition-colors px-3 py-1.5 border border-sovereign-silver hover:border-navy"
              title="New conversation"
            >
              New Chat
            </button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-6 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
              {msg.role === 'assistant' ? (
                <div className="flex gap-4 max-w-full">
                  <AgentBadge agent={msg.agent} />
                  <div className="min-w-0">
                    {msg.agent && msg.agent.name && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-navy">
                          {msg.agent.name}
                        </span>
                        {msg.agent.focus && (
                          <span className="text-[10px] uppercase tracking-wider text-sovereign-steel">
                            — {msg.agent.focus}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="prose-sm text-charcoal leading-relaxed">
                      <MessageContent content={msg.content} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-[80%]">
                  <div className="bg-navy text-white px-5 py-3.5 text-sm leading-relaxed">
                    {msg.content}
                  </div>
                  {msg.files && msg.files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 justify-end">
                      {msg.files.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 px-3 py-1.5 bg-sovereign-ash border border-sovereign-silver text-xs text-slate">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          {f.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Streaming message */}
          {(isTyping || streamingContent) && (
            <div className="mb-6 flex gap-4">
              <AgentBadge agent={activeAgent} />
              <div className="min-w-0">
                {activeAgent && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-navy">
                      {activeAgent.name}
                    </span>
                    {activeAgent.focus && (
                      <span className="text-[10px] uppercase tracking-wider text-sovereign-steel">
                        — {activeAgent.focus}
                      </span>
                    )}
                  </div>
                )}
                {searchStatus && !streamingContent && (
                  <div className="flex items-center gap-2 py-2 mb-2 text-xs text-slate">
                    <svg className="animate-spin w-3.5 h-3.5 text-navy" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>{searchStatus}</span>
                  </div>
                )}
                {streamingContent ? (
                  <div className="prose-sm text-charcoal leading-relaxed">
                    <MessageContent content={streamingContent} />
                    <span className="inline-block w-1.5 h-4 bg-navy/60 animate-pulse ml-0.5 align-text-bottom" />
                  </div>
                ) : !searchStatus ? (
                  <div className="flex items-center gap-1.5 py-3">
                    <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Suggested Prompts */}
          {showSuggestions && (
            <div className="mt-4 mb-6">
              <span className="text-label uppercase text-slate tracking-widest mb-3 block">Try asking</span>
              <div className="grid gap-2">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-4 py-3 border border-sovereign-silver text-sm text-slate hover:border-navy hover:text-navy transition-all duration-200 leading-relaxed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-sovereign-silver bg-white flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4">
          {/* File Attachments */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-sovereign-ash border border-sovereign-silver text-xs text-slate">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  <span className="max-w-[150px] truncate">{file.name}</span>
                  <span className="text-sovereign-steel">{formatFileSize(file.size)}</span>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-sovereign-steel hover:text-navy ml-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            {/* File Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0 p-2.5 text-slate hover:text-navy border border-sovereign-silver hover:border-navy transition-colors"
              title="Upload documents"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.json,.geojson,.shp,.kml,.kmz,.png,.jpg,.jpeg,.tif,.tiff"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your project, ask a question, or upload documents..."
                rows={1}
                disabled={isTyping}
                className="w-full px-4 py-3 border border-sovereign-silver bg-white text-charcoal text-sm placeholder-sovereign-steel focus:border-navy focus:outline-none transition-colors resize-none leading-relaxed disabled:opacity-50"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={(!input.trim() && files.length === 0) || isTyping}
              className="flex-shrink-0 p-2.5 bg-navy text-white hover:bg-navy-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-sovereign-steel">
            <span>Accepts PDF, DOCX, CSV, GeoJSON, KML, imagery. Shift+Enter for new line.</span>
            <span className="font-mono">ESW.AI v2.0 — Multi-Agent</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Agent Badge ──────────────────────────────────────────────────────
function AgentBadge({ agent }) {
  const label = agent?.id ? AGENT_LABELS[agent.id] : null
  const abbr = label?.abbr || 'AI'
  const color = label?.color || 'bg-navy'

  return (
    <div className={`w-7 h-7 ${color} flex items-center justify-center flex-shrink-0 mt-1`} title={agent?.name || 'ESW.AI'}>
      <span className="text-white font-mono font-bold text-[8px] leading-none">{abbr}</span>
    </div>
  )
}

// ── Markdown-lite renderer ──────────────────────────────────────────
function MessageContent({ content }) {
  const lines = content.split('\n')
  const elements = []
  let listItems = []
  let numberedItems = []

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-2 text-sm">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      )
      listItems = []
    }
    if (numberedItems.length > 0) {
      elements.push(
        <ol key={`olist-${elements.length}`} className="list-decimal list-inside space-y-1 my-2 text-sm">
          {numberedItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      )
      numberedItems = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (numberedItems.length > 0) flushList()
      listItems.push(line.slice(2))
      continue
    }

    const numberedMatch = line.match(/^\d+\.\s+(.+)/)
    if (numberedMatch) {
      if (listItems.length > 0) flushList()
      numberedItems.push(numberedMatch[1])
      continue
    }

    flushList()

    if (line === '') {
      continue
    }

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines = [line]
      let j = i + 1
      while (j < lines.length && lines[j].includes('|') && lines[j].trim().startsWith('|')) {
        tableLines.push(lines[j])
        j++
      }
      if (tableLines.length >= 2) {
        elements.push(<MarkdownTable key={i} lines={tableLines} />)
        i = j - 1
        continue
      }
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={i} className="text-sm font-semibold text-navy mt-4 mb-2 uppercase tracking-wider">
          {renderInline(line.slice(4))}
        </h4>
      )
    } else if (line.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="text-base font-semibold text-navy mt-4 mb-2">
          {renderInline(line.slice(3))}
        </h3>
      )
    } else if (line.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="text-lg font-bold text-navy mt-4 mb-2 font-serif">
          {renderInline(line.slice(2))}
        </h2>
      )
    } else if (line.startsWith('```')) {
      // Code block
      const codeLines = []
      let j = i + 1
      while (j < lines.length && !lines[j].startsWith('```')) {
        codeLines.push(lines[j])
        j++
      }
      elements.push(
        <pre key={i} className="bg-sovereign-ash border border-sovereign-silver p-3 my-2 text-xs font-mono overflow-x-auto">
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      i = j
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-navy pl-3 my-2 text-sm text-slate italic">
          {renderInline(line.slice(2))}
        </blockquote>
      )
    } else if (line.startsWith('---') || line.startsWith('***')) {
      elements.push(<hr key={i} className="my-4 border-sovereign-silver" />)
    } else {
      elements.push(
        <p key={i} className="text-sm leading-relaxed mb-2">
          {renderInline(line)}
        </p>
      )
    }
  }

  flushList()
  return <>{elements}</>
}

// ── Markdown Table Renderer ──────────────────────────────────────────
function MarkdownTable({ lines }) {
  const parseRow = (line) =>
    line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0)

  const header = parseRow(lines[0])
  // Skip separator line (line with dashes)
  const isSeparator = (line) => /^\|[\s\-:|]+\|$/.test(line.trim()) || parseRow(line).every(c => /^[-:]+$/.test(c))
  const bodyLines = lines.slice(1).filter(l => !isSeparator(l))
  const rows = bodyLines.map(parseRow)

  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-xs border border-sovereign-silver">
        <thead>
          <tr className="bg-sovereign-ash">
            {header.map((cell, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-navy border-b border-sovereign-silver">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-sovereign-ash/50' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-charcoal border-b border-sovereign-silver">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderInline(text) {
  const parts = []
  // Match bold, inline code, and italic
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|_(.+?)_)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[2]) {
      // Bold
      parts.push(
        <strong key={match.index} className="text-navy font-semibold">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // Inline code
      parts.push(
        <code key={match.index} className="bg-sovereign-ash px-1 py-0.5 text-xs font-mono">
          {match[3]}
        </code>
      )
    } else if (match[4]) {
      // Italic
      parts.push(
        <em key={match.index} className="italic">
          {match[4]}
        </em>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

// ── Local fallback response generator ────────────────────────────────
// Provides substantive domain-expert responses when API is unavailable.
// Each branch delivers real, actionable content — not just placeholders.
function generateLocalResponse(userMessage, attachedFiles) {
  const lower = userMessage.toLowerCase()

  // Helper: detect keywords
  const has = (...terms) => terms.some(t => lower.includes(t))

  if (attachedFiles && attachedFiles.length > 0) {
    const fileNames = attachedFiles.map((f) => f.name).join(', ')
    return `Thank you for uploading **${fileNames}**.

Document analysis requires the full multi-agent system. To activate it, set your \`ANTHROPIC_API_KEY\` and run \`npm run api\`.

**While we get that set up, help me understand your project:**
1. What is the **project location** and relevant jurisdiction?
2. What is the **primary objective** — carbon credits, BNG, regulatory compliance, green bond structuring?
3. What are your **timeline and budget parameters**?

This information lets us route your documents to the right specialist agents.`
  }

  // ── Coastal / Mangrove / Wetland Restoration ────────────────────────
  if (has('coastal', 'mangrove', 'wetland', 'marsh', 'seagrass', 'tidal')) {
    const isSEA = has('southeast asia', 'indonesia', 'vietnam', 'philippines', 'thailand', 'malaysia', 'myanmar', 'cambodia')
    const region = isSEA ? 'Southeast Asia' : 'your target region'

    return `## Coastal Restoration — Financing Instruments

For a 500-hectare coastal project in ${region}, here are the primary financing instruments available:

### Carbon Credits
- **Verra VCS VM0033** — Tidal Wetland and Seagrass Restoration. Blue carbon methodology for mangroves and tidal marshes. Estimated yield: **8–15 tCO₂e/ha/year** for mangrove restoration
- **Verra VM0007** — REDD+ for mangrove conservation where deforestation is the baseline
- **Gold Standard** — Community-based blue carbon with strong co-benefit requirements
- **Plan Vivo** — Suitable for community-managed coastal restoration with smallholders

### Biodiversity Credits
- **Biodiversity Credit Alliance** — Emerging market for measurable biodiversity uplift
- **Wallacea Trust / Verra SD VISta** — Stackable with carbon credits for additional revenue

### Multilateral & Climate Finance
- **Green Climate Fund (GCF)** — Blue carbon eligible. Grants + concessional loans
- **Global Environment Facility (GEF)** — Coastal and marine biodiversity programmes
- **Adaptation Fund** — Climate adaptation for vulnerable coastal communities
- **Asian Development Bank (ADB)** — Blue finance for ASEAN coastal infrastructure

### Blended Finance & Bonds
- **Blue Bonds** — Sovereign or corporate issuance linked to ocean/coastal outcomes (e.g. Belize model)
- **Sustainability-Linked Loans** — KPIs tied to hectares restored, mangrove survival rates
- **Impact Investment** — Funds like Mirova Natural Capital, Livelihoods Funds

### Revenue Stacking (Typical Structure)
| Layer | Instrument | Estimated % of Capital Stack |
|-------|-----------|------------------------------|
| Concessional | GCF / ADB grant | 25–35% |
| Debt | Blue bond / SLL | 30–40% |
| Revenue | Carbon credits | 20–30% |
| Revenue | Biodiversity credits | 5–10% |

### Key Considerations for ${region}
- National carbon market regulations vary — Indonesia has new carbon trading rules (PP 21/2024); Vietnam has its pilot ETS
- Community land tenure and FPIC (Free, Prior and Informed Consent) are critical
- Monitoring: remote sensing + ground-truthing required for blue carbon MRV
- Co-benefits documentation strengthens credit pricing: livelihood, fisheries, storm protection

**For a detailed bankability assessment** with IRR/NPV modelling, connect the full ESW.AI system by running \`npm run api\` with your API key.`
  }

  // ── Carbon Credits ──────────────────────────────────────────────────
  if (has('carbon', 'credit', 'offset', 'emission')) {
    return `## Carbon Credit Structuring

### Certification Standards
- **Verra VCS** — Largest voluntary market. Methodologies for forestry (ARR, REDD+, IFM), wetlands, mangroves, agriculture. ~70% market share
- **Gold Standard** — Premium pricing ($15–45/tCO₂e). Strong co-benefit requirements. Preferred by EU corporate buyers
- **Plan Vivo** — Community-focused. Smallholder agroforestry and landscape restoration. Lower issuance costs
- **ART TREES** — Jurisdictional REDD+ credits. Government-level programmes

### Estimated Credit Yields by Ecosystem
| Ecosystem | Yield (tCO₂e/ha/yr) | Methodology |
|-----------|---------------------|-------------|
| Mangrove restoration | 8–15 | VM0033 |
| Tropical reforestation | 10–25 | ARR (VM0047) |
| Avoided deforestation | 5–15 | REDD+ (VM0015) |
| Peatland rewetting | 15–35 | VM0036 |
| Agroforestry | 3–8 | Plan Vivo |

### Pricing (2025–2026 Voluntary Market)
- Standard REDD+: $4–12/tCO₂e
- High-integrity removal credits: $20–50/tCO₂e
- Blue carbon (mangrove): $15–35/tCO₂e
- Gold Standard certified: $15–45/tCO₂e

### Project Development Timeline
1. **Feasibility** (2–3 months) — Baseline, additionality, methodology selection
2. **PDD Development** (3–6 months) — Project Design Document
3. **Validation** (3–6 months) — Third-party audit (e.g. SCS Global, RINA)
4. **Registration** — Verra/GS registry listing
5. **First Issuance** — Typically 18–30 months from project start

**For a site-specific feasibility assessment**, activate the full system with \`npm run api\`.`
  }

  // ── Finance / Capital / Bonds ───────────────────────────────────────
  if (has('financ', 'capital', 'fund', 'bond', 'invest', 'loan', 'bank', 'roi', 'irr')) {
    return `## Blended Finance & Capital Structuring

### Capital Stack Architecture

| Layer | Instruments | Typical Terms |
|-------|------------|---------------|
| **Concessional** | DFI lending (ADB, EIB, IFC, KfW), climate funds | Below-market rate, 10–20yr tenor |
| **Grant** | GCF, GEF, Adaptation Fund, bilateral donors | Non-repayable, catalytic |
| **Commercial Debt** | Green bonds, sustainability-linked loans | Market rate, 5–10yr |
| **Equity** | Impact funds, private equity, family offices | 8–15% target IRR |
| **Revenue** | Carbon credits, biodiversity credits, PES | Recurring, performance-based |

### Green Bond Frameworks
- **ICMA Green Bond Principles** — Use of proceeds, project evaluation, management of proceeds, reporting
- **EU Green Bond Standard** — Aligned with EU Taxonomy. Mandatory for "European Green Bond" label
- **Climate Bonds Initiative** — Sector-specific certification (forestry, land use, marine)

### Key Financial Metrics for Nature Projects
- **IRR**: Typically 6–12% for blended finance nature projects
- **Payback Period**: 7–15 years depending on credit generation timeline
- **NPV Sensitivity**: Most sensitive to carbon price and survival/growth rates

### Bankability Checklist
1. Clear land tenure / concession agreements
2. Validated baseline and additionality
3. Regulatory permits in place
4. MRV plan with third-party verification
5. Offtake agreements or letter of intent for credits
6. Insurance / risk mitigation strategy

**For full financial modelling** with scenario analysis, activate the system with \`npm run api\`.`
  }

  // ── Biodiversity / BNG / EIA ────────────────────────────────────────
  if (has('biodiversity', 'bng', 'species', 'habitat', 'eia', 'impact assessment', 'ecological')) {
    return `## Biodiversity Assessment & Net Gain

### Biodiversity Net Gain (BNG) Framework
- **UK BNG** — Mandatory 10% net gain under Environment Act 2021. Uses Defra Metric 4.0
- **EU No Net Loss** — Under Nature Restoration Law. 20% of EU land/sea areas under restoration by 2030
- **IFC PS6** — Performance Standard 6 for biodiversity in development finance

### Assessment Methodology
1. **Baseline Survey** — Habitat mapping (UKHab/EUNIS classification), species surveys, condition assessment
2. **Impact Assessment** — Quantify losses from development footprint
3. **Mitigation Hierarchy** — Avoid → Minimise → Restore → Offset
4. **Offset Calculation** — Biodiversity units required to achieve net gain
5. **Management & Monitoring** — 30-year management plan with adaptive monitoring

### Biodiversity Credit Markets
- **England Statutory Credits** — £42,000/unit (last resort), managed by Natural England
- **Voluntary Market** — Emerging. Wallacea Trust, Plan Vivo Biodiversity, ValueNature
- **Pricing** — Highly variable: £15,000–50,000/unit depending on habitat type and location

### Key Metrics
| Metric | Standard | Application |
|--------|----------|-------------|
| Biodiversity Units | Defra 4.0 | UK statutory BNG |
| MSA (Mean Species Abundance) | GLOBIO | TNFD, corporate disclosure |
| STAR (Species Threat Abatement) | IUCN | Site-level threat reduction |
| Ecosystem Condition | SEEA EA | National accounting |

**For a site-specific ecological assessment**, connect the full agent system with \`npm run api\`.`
  }

  // ── Nature-based Solutions / Restoration / NbS ──────────────────────
  if (has('nbs', 'nature-based', 'restoration', 'reforest', 'agroforest', 'permaculture', 'rewild')) {
    return `## Nature-based Solutions Design

### NbS Typology (IUCN Global Standard)
- **Ecosystem Restoration** — Reforestation, wetland rewetting, grassland restoration
- **Issue-Specific** — Flood management (SuDS, floodplain reconnection), erosion control, urban heat
- **Infrastructure-Related** — Green roofs, bioswales, constructed wetlands, ecological corridors
- **Ecosystem-Based Management** — Protected areas, sustainable forestry, marine zoning

### Design Principles
1. **Mitigation Hierarchy** — Avoid first, then minimise, restore, and offset as last resort
2. **Biome-Appropriate** — Species selection matched to local ecology, soil, hydrology
3. **Multi-Functional** — Stack ecosystem services: carbon + biodiversity + water + livelihood
4. **Climate-Resilient** — Design for future climate scenarios (RCP 4.5/8.5)
5. **Community-Integrated** — FPIC, livelihood co-benefits, local stewardship

### Estimated Ecosystem Service Values
| NbS Type | Carbon (tCO₂e/ha/yr) | Biodiversity Uplift | Additional Services |
|----------|----------------------|--------------------|--------------------|
| Tropical reforestation | 10–25 | High | Watershed, timber |
| Mangrove restoration | 8–15 | Very High | Coastal protection, fisheries |
| Peatland rewetting | 15–35 | Medium | Water quality, flood control |
| Agroforestry | 3–8 | Medium | Food security, livelihoods |
| Urban green infrastructure | 1–3 | Low-Medium | Heat reduction, amenity |

**For a tailored NbS design** with species palettes and spatial plans, activate the full system with \`npm run api\`.`
  }

  // ── TNFD / CSRD / Regulatory ────────────────────────────────────────
  if (has('tnfd', 'csrd', 'compliance', 'disclosure', 'taxonomy', 'regulation', 'esrs', 'issb', 'permit')) {
    return `## Regulatory Compliance & Disclosure

### Active Frameworks
| Framework | Jurisdiction | Status | Scope |
|-----------|-------------|--------|-------|
| **CSRD / ESRS** | EU | Mandatory (phased 2024–2028) | ~50,000 companies. Nature under ESRS E4 |
| **TNFD** | Global | Voluntary (adoption growing) | LEAP approach for nature-related risks |
| **ISSB S1/S2** | Global | Adopted by 20+ jurisdictions | Climate baseline, nature pending |
| **EU Taxonomy** | EU | Mandatory for CSRD reporters | 6 environmental objectives |
| **Nature Restoration Law** | EU | Effective 2024 | 20% land/sea restoration by 2030 |
| **Kunming-Montreal GBF** | Global | Targets for 2030 | 30x30, reduce biodiversity loss |

### TNFD LEAP Approach
1. **Locate** — Interface with nature (dependencies, impacts by site)
2. **Evaluate** — Risks and opportunities assessment
3. **Assess** — Material nature-related risks for financial planning
4. **Prepare** — Disclosure and target-setting

### EU Taxonomy — Nature-Relevant Objectives
- Climate change mitigation (reforestation, blue carbon)
- Climate change adaptation (NbS for flood/drought resilience)
- Sustainable use of water and marine resources
- Transition to circular economy
- Pollution prevention
- **Protection and restoration of biodiversity and ecosystems**

**For jurisdiction-specific compliance mapping**, connect the full system with \`npm run api\`.`
  }

  // ── Solar / Agrivoltaics / Renewable Energy ─────────────────────────
  if (has('solar', 'agrivoltaic', 'renewable', 'wind', 'energy', 'photovoltaic')) {
    return `## Renewable Energy Ecology & Agrivoltaics

### Agrivoltaic Design Models
- **Elevated Fixed** — Panels at 3–5m height. Grazing, shade-tolerant crops underneath
- **Tracking + Agriculture** — Single-axis trackers with row spacing for machinery
- **Vertical Bifacial** — East-west orientation. Full land use between rows
- **Integrated Greenhouse** — Semi-transparent PV on greenhouse roofs

### Ecological Enhancement for Solar Sites
- **Pollinator Habitat** — Wildflower meadows under/between panels. UK BNG compliance
- **Sheep Grazing** — Dual land use. Reduces vegetation management costs
- **Biodiversity Corridors** — Hedgerow planting, buffer zones, bat/bird boxes
- **Soil Health** — Cover crops, no-till approach improves soil carbon

### Regulatory Context
- **UK** — BNG mandatory for all solar farms >1MW (Environment Act 2021)
- **EU** — Environmental Impact Assessment required (EIA Directive 2014/52/EU)
- **CSRD** — Land use and biodiversity disclosure for large operators
- **Spain** — Agrivoltaic projects eligible for additional feed-in premium

### Financial Stack for Agrivoltaic Projects
- PPA revenue (energy)
- Agricultural yield
- BNG unit sales / biodiversity credits
- Carbon credits (soil carbon, hedgerow establishment)
- Green bond eligible under EU Taxonomy

**For a site-specific ecological enhancement plan**, activate the full system with \`npm run api\`.`
  }

  // ── GIS / Spatial / Mapping ─────────────────────────────────────────
  if (has('gis', 'spatial', 'mapping', 'satellite', 'remote sensing', 'geospatial', 'land use')) {
    return `## Spatial Analysis & GIS Capabilities

### Data Sources
- **Sentinel-2** — 10m resolution, 5-day revisit. NDVI, land cover classification
- **Planet Labs** — 3–5m daily imagery. Change detection, deforestation monitoring
- **LIDAR** — High-resolution elevation. Canopy height, terrain modelling
- **Global Forest Watch** — Tree cover loss/gain, fire alerts, deforestation drivers
- **EU Copernicus** — Land cover (CORINE), soil moisture, vegetation indices

### Analysis Capabilities
1. **Constraints Mapping** — Protected areas, flood zones, slope, accessibility, land tenure
2. **Habitat Classification** — UKHab, EUNIS, or national classification systems
3. **Change Detection** — Multi-temporal analysis for baseline deforestation/degradation
4. **Connectivity Analysis** — Ecological corridors, landscape permeability, fragmentation indices
5. **Suitability Modelling** — Multi-criteria analysis for restoration or development sites

### MRV (Monitoring, Reporting, Verification)
- Remote sensing-based biomass estimation for carbon projects
- Canopy cover and height tracking for reforestation MRV
- Water body extent and condition monitoring for wetland projects

**For project-specific spatial analysis**, connect the full agent system with \`npm run api\`.`
  }

  // ── General fallback — still useful ─────────────────────────────────
  return `Thank you for your inquiry. Let me outline how ESW.AI can assist.

### Our Specialist Agents

| Agent | Focus | Expertise |
|-------|-------|-----------|
| **Eco-Scientist** | Ecology | Biodiversity baselines, EIA, species risk, habitat assessment |
| **Regen-Architect** | Design | Nature-based Solutions, mitigation hierarchy, landscape restoration |
| **GIS Analyst** | Spatial | Constraint mapping, satellite analysis, site suitability |
| **Green Financier** | Finance | Carbon/biodiversity credits, blended finance, ROI modelling |
| **Legal Compliance** | Risk | Multi-jurisdictional law, permitting, CSRD/TNFD compliance |

### What We Can Analyse
- **Carbon credit potential** — Methodology selection, yield estimation, pricing
- **Biodiversity net gain** — Baseline assessment, offset calculation, credit markets
- **Blended finance structuring** — Capital stacks, green bonds, DFI funding
- **Regulatory compliance** — CSRD, TNFD, EU Taxonomy, local environmental law
- **Nature-based Solutions** — Restoration design, agrivoltaics, ecosystem services
- **Spatial analysis** — Site mapping, constraints, remote sensing MRV

### Get Started
Describe your project with:
1. **Location** and jurisdiction
2. **Scale** (hectares, budget range)
3. **Objective** (credits, compliance, restoration, investment structuring)

For the **full multi-agent analysis** with AI-powered routing, set your \`ANTHROPIC_API_KEY\` and run \`npm run api\`.`
}

export default ESWChat
