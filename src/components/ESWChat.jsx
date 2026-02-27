import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_GREETING = {
  role: 'assistant',
  content: `Welcome to **ESW.AI** — the intelligent project structuring engine for nature-based infrastructure finance.

I can help you develop comprehensive project proposals for ecosystem services, regenerative infrastructure, and sustainable finance.

**What I can do:**
- Analyse your project site and context
- Design Nature-Based Solutions tailored to your biome and jurisdiction
- Structure blended finance capital stacks
- Prepare CSRD / TNFD / ISSB compliance frameworks
- Estimate carbon and biodiversity credit potential
- Draft bankability assessments

**To get started**, describe your project or upload relevant documents (site plans, EIA reports, financial summaries).`,
}

const SUGGESTED_PROMPTS = [
  'I have a 500-hectare coastal restoration project in Southeast Asia. What financing instruments are available?',
  'We need to structure a TNFD-compliant biodiversity assessment for a solar farm in Southern Europe.',
  'Help me design a blended finance capital stack for urban green infrastructure in Latin America.',
  'What are the carbon credit certification options for a mangrove restoration project?',
]

function ESWChat({ onClose }) {
  const [messages, setMessages] = useState([SYSTEM_GREETING])
  const [input, setInput] = useState('')
  const [files, setFiles] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

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

  const handleSend = async (text) => {
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

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response = generateResponse(messageText, userMessage.files)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1500 + Math.random() * 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestedPrompt = (prompt) => {
    handleSend(prompt)
  }

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
                <span className="text-[10px] uppercase tracking-widest text-slate">Project Intelligence Engine</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Online
            </div>
            <button
              onClick={() => {
                setMessages([SYSTEM_GREETING])
                setFiles([])
                setInput('')
              }}
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
                  <div className="w-7 h-7 bg-navy flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-serif font-bold text-[10px]">AI</span>
                  </div>
                  <div className="prose-sm text-charcoal leading-relaxed min-w-0">
                    <MessageContent content={msg.content} />
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

          {isTyping && (
            <div className="mb-6 flex gap-4">
              <div className="w-7 h-7 bg-navy flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-serif font-bold text-[10px]">AI</span>
              </div>
              <div className="flex items-center gap-1.5 py-3">
                <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: '300ms' }} />
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
                    onClick={() => handleSuggestedPrompt(prompt)}
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
                className="w-full px-4 py-3 border border-sovereign-silver bg-white text-charcoal text-sm placeholder-sovereign-steel focus:border-navy focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() && files.length === 0}
              className="flex-shrink-0 p-2.5 bg-navy text-white hover:bg-navy-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-sovereign-steel">
            <span>Accepts PDF, DOCX, CSV, GeoJSON, KML, imagery. Shift+Enter for new line.</span>
            <span className="font-mono">ESW.AI v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Markdown-lite renderer ──────────────────────────────────────────
function MessageContent({ content }) {
  const lines = content.split('\n')
  const elements = []
  let listItems = []

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
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('- ') || line.startsWith('* ')) {
      listItems.push(line.slice(2))
      continue
    }

    flushList()

    if (line === '') {
      continue
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

function renderInline(text) {
  const parts = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <strong key={match.index} className="text-navy font-semibold">
        {match[1]}
      </strong>
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

// ── Simulated response generator (placeholder for API) ──────────────
function generateResponse(userMessage, attachedFiles) {
  const lower = userMessage.toLowerCase()

  if (attachedFiles && attachedFiles.length > 0) {
    const fileNames = attachedFiles.map((f) => f.name).join(', ')
    return `Thank you for uploading **${fileNames}**.

I've received your documents and will analyse them in the context of your project. In a production environment, ESW.AI would:

- **Extract** key data points (site area, species lists, financial parameters, regulatory context)
- **Cross-reference** against our Ontology of global environmental regulations and standards
- **Generate** a structured project proposal with NbS recommendations, financial modelling, and compliance mapping

**To proceed**, please tell me more about:
1. Your project location and jurisdiction
2. The primary objective (carbon credits, biodiversity net gain, regulatory compliance, green bond structuring)
3. Your timeline and budget parameters

This will allow me to generate a comprehensive, actionable project proposal.`
  }

  if (lower.includes('carbon') || lower.includes('credit')) {
    return `## Carbon Credit Structuring Advisory

Based on your request, here's a framework for carbon credit development:

### Certification Standards
- **Verra VCS** — Largest voluntary market standard. Suited for forestry (ARR, REDD+), wetlands, mangroves
- **Gold Standard** — Premium pricing, strong co-benefits requirements. Preferred by EU buyers
- **Plan Vivo** — Community-focused. Strong for smallholder agroforestry and landscape restoration

### Key Steps
- Baseline establishment (remote sensing + field surveys)
- Methodology selection and PDD development
- Validation by accredited VVB
- Monitoring, reporting, and verification (MRV) system design
- Credit issuance and market access

### Financial Estimates
- Development cost: $50K–$250K depending on methodology and scale
- Time to first issuance: 18–36 months
- Market pricing: $8–$35/tCO₂e (varies by standard, vintage, co-benefits)

**Upload your site documentation** or describe the project location and scale for a tailored assessment.`
  }

  if (lower.includes('finance') || lower.includes('capital') || lower.includes('fund') || lower.includes('bond')) {
    return `## Blended Finance Structuring

ESW structures multi-source capital stacks for nature-based infrastructure. Here's the typical architecture:

### Capital Stack Layers
- **Concessional Layer** — DFI lending (CAF, AfDB, ADB, EIB) at below-market rates
- **Grant Layer** — Climate funds (GCF, GEF, Adaptation Fund), bilateral donors, C40 CFF
- **Commercial Layer** — Green bonds, sustainability-linked loans, project finance
- **Revenue Layer** — Carbon credits, biodiversity credits, ecosystem service payments, land value capture

### ESW Deliverables
- Bankability assessment with IRR/NPV modelling
- Investor-ready project documentation
- Regulatory alignment mapping (jurisdiction-specific)
- MRV framework design for credit and bond verification

### Success Metrics
- Average 35% cost-of-capital reduction through concessional instrument integration
- 4:1 economic return ratio (IDB NbS benchmark)
- 6–12 months faster to financial close vs. traditional advisory

**Tell me about your project specifics** — location, scale, and target outcomes — for a tailored capital stack recommendation.`
  }

  if (lower.includes('tnfd') || lower.includes('csrd') || lower.includes('compliance') || lower.includes('disclosure')) {
    return `## Regulatory Compliance & Disclosure

ESW structures compliance across the major sustainability reporting frameworks:

### Active Frameworks
- **CSRD / ESRS** — EU mandatory sustainability reporting. Double materiality assessment, biodiversity metrics (E4), climate adaptation (E1)
- **TNFD** — Nature-related financial disclosures. LEAP approach: Locate, Evaluate, Assess, Prepare
- **ISSB / IFRS S1-S2** — Global baseline for sustainability disclosures. Nature standard in development
- **EU Taxonomy** — Activity classification for sustainable investment. Do No Significant Harm (DNSH) criteria

### ESW Approach
- Materiality assessment (financial + impact)
- Data gap analysis and collection strategy
- Metric design aligned to ESRS E1–E5 and TNFD recommended disclosures
- Audit-ready reporting packages

### Jurisdiction Mapping
We adapt disclosure strategies to local regulatory environments — EU, UK, Singapore, Japan, Brazil, and others implementing ISSB-aligned standards.

**Describe your reporting obligations** and I'll map the specific requirements and timeline for your jurisdiction.`
  }

  if (lower.includes('solar') || lower.includes('renewable') || lower.includes('agrivoltaic')) {
    return `## Renewable Energy Ecology & Agrivoltaics

ESW integrates ecological value into renewable energy projects:

### Services for Solar & Wind Developers
- **Environmental Impact Assessment** — Multi-jurisdictional EIA covering biodiversity, landscape, and cumulative effects
- **Biodiversity Net Gain** — Habitat baseline, impact assessment, and BNG unit calculation
- **Agrivoltaic Design** — Dual land-use optimisation (energy + ecology/agriculture)
- **Credit Structuring** — Biodiversity credits from enhanced habitat beneath and around solar arrays

### Typical Outcomes
- 20–40% BNG uplift through targeted habitat creation
- Pollinator corridor integration
- Carbon sequestration from on-site soil restoration
- Compliance with EU Taxonomy Regulation (Climate Change Mitigation + DNSH biodiversity)

**Share your project details** — location, capacity, and timeline — for a tailored ecological integration strategy.`
  }

  return `Thank you for your inquiry. Based on your description, ESW.AI can develop a comprehensive project proposal covering:

### Preliminary Assessment
- **Site Analysis** — Biome classification, ecological baseline requirements, and spatial constraints
- **Regulatory Scan** — Applicable environmental law, disclosure obligations, and permitting pathway
- **Financial Scoping** — Eligible instruments, credit potential, and preliminary ROI estimates

### Next Steps
To generate a detailed proposal, I would need:
1. **Location & Scale** — Country, region, site area (hectares)
2. **Project Type** — Restoration, conservation, infrastructure ecology, urban NbS
3. **Objective** — Carbon credits, biodiversity net gain, regulatory compliance, green financing
4. **Documents** — Any existing site surveys, EIA reports, financial models, or project briefs

**Upload your project documents** or provide these details, and I'll generate a structured proposal with actionable recommendations.`
}

export default ESWChat
