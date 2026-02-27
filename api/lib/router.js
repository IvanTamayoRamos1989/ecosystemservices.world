/**
 * ESW Agent Router
 *
 * Classifies incoming user messages and determines which specialist agent(s)
 * should handle the query. This mirrors the Project Controller's orchestration
 * logic — routing to the right specialist based on the nature of the inquiry.
 */

// Agent routing rules: keyword patterns → agent IDs
const ROUTING_RULES = [
  {
    id: 'eco-scientist',
    patterns: [
      /\b(biodiversity|species|habitat|ecological|baseline|eia\b|environmental impact|fauna|flora|iucn|red list|ecosystem function|soil ecology|hydrology|sensitivity map)/i,
      /\b(tnfd|nature.?related risk|ecological baseline|habitat condition|bng calculation)/i,
    ],
    weight: 1,
  },
  {
    id: 'regen-architect',
    patterns: [
      /\b(nature.?based solution|nbs|restoration|mitigation hierarchy|agrivoltaic|permaculture|agroforestry)/i,
      /\b(pollinator|corridor|wetland design|landscape restoration|soil amendment|native species|planting protocol)/i,
      /\b(design.*solution|solution.*design|regenerat)/i,
    ],
    weight: 1,
  },
  {
    id: 'gis-analyst',
    patterns: [
      /\b(gis|spatial|satellite|ndvi|land cover|remote sensing|sentinel|landsat|constraint map)/i,
      /\b(topograph|elevation|watershed|site.*map|boundary|coordinate|geojson|shapefile|kml)/i,
    ],
    weight: 1,
  },
  {
    id: 'green-financier',
    patterns: [
      /\b(carbon credit|biodiversity credit|verra|gold standard|plan vivo|art trees)/i,
      /\b(green bond|sustainability.?linked|blended finance|capital stack|irr|npv|roi|bankab)/i,
      /\b(financ|investment|fund|capex|opex|credit market|valuation|eu taxonomy)/i,
    ],
    weight: 1,
  },
  {
    id: 'legal-compliance',
    patterns: [
      /\b(legal|law|regulation|permitting|permit|compliance|contract|liability|tenure)/i,
      /\b(csrd|issb|disclosure|anti.?corruption|sanctions|due diligence|gdpr)/i,
      /\b(eia legislation|land law|easement|concession|licensing)/i,
    ],
    weight: 1,
  },
  {
    id: 'brand-voice',
    patterns: [
      /\b(case study|white paper|linkedin|content|brand|marketing|pitch deck|investor material)/i,
      /\b(publish|write.*article|draft.*post|communication)/i,
    ],
    weight: 0.8,
  },
  {
    id: 'growth-hacker',
    patterns: [
      /\b(lead|prospect|outreach|pipeline|target.*market|competitive|tender|client acquisition)/i,
      /\b(crm|conversion|sales|cold.*email)/i,
    ],
    weight: 0.8,
  },
  {
    id: 'agent-architect',
    patterns: [
      /\b(system|agent|prompt|workflow|architecture|meta)/i,
      /\b(how.*esw.*work|how.*system.*work|agent.*registry|capabilities)/i,
    ],
    weight: 0.5,
  },
  {
    id: 'talent-scout',
    patterns: [
      /\b(human expert|field.*specialist|hire|recruit|talent|local.*expertise|verification.*sign)/i,
    ],
    weight: 0.8,
  },
  {
    id: 'procurement-manager',
    patterns: [
      /\b(vendor|supplier|procurement|subcontract|lab|nursery|survey.*team)/i,
    ],
    weight: 0.8,
  },
]

/**
 * Score all agents against a user message.
 * Returns sorted array of { agentId, score, matchedPatterns }.
 */
export function scoreAgents(message) {
  const scores = []

  for (const rule of ROUTING_RULES) {
    let matchCount = 0
    const matched = []

    for (const pattern of rule.patterns) {
      const m = message.match(pattern)
      if (m) {
        matchCount++
        matched.push(m[0])
      }
    }

    if (matchCount > 0) {
      scores.push({
        agentId: rule.id,
        score: matchCount * rule.weight,
        matchedPatterns: matched,
      })
    }
  }

  return scores.sort((a, b) => b.score - a.score)
}

/**
 * Determine the primary agent and any supporting agents for a query.
 * Returns { primary: agentId, supporting: agentId[], isNewProject: boolean }
 */
export function routeQuery(message, conversationContext = {}) {
  const scores = scoreAgents(message)
  const lower = message.toLowerCase()

  // Detect new project intake
  const isNewProject =
    /\b(new project|project proposal|develop.*project|structure.*project|comprehensive.*assessment)/i.test(message) ||
    /\b(i have a.*project|we need.*project|help.*with.*project)/i.test(message) ||
    (lower.includes('hectare') && (lower.includes('project') || lower.includes('site')))

  // If this looks like a new project, route to Project Controller
  if (isNewProject && scores.length > 0) {
    return {
      primary: 'project-controller',
      supporting: scores.slice(0, 2).map(s => s.agentId),
      isNewProject: true,
      scores,
    }
  }

  // If no matches or very low confidence, use Project Controller as general intake
  if (scores.length === 0 || scores[0].score < 0.5) {
    return {
      primary: 'project-controller',
      supporting: [],
      isNewProject: false,
      scores,
    }
  }

  // Route to the highest-scoring agent
  const primary = scores[0].agentId
  const supporting = scores
    .slice(1, 3)
    .filter(s => s.score >= 1)
    .map(s => s.agentId)

  return {
    primary,
    supporting,
    isNewProject: false,
    scores,
  }
}

/**
 * Detect if a message contains a handoff directive from an agent response.
 * Returns { targetAgent, request } or null.
 */
export function detectHandoff(agentResponse) {
  const handoffPattern = /HANDOFF\s*→\s*([^:]+):\s*(.+?)(?:\n|$)/g
  const handoffs = []
  let match

  while ((match = handoffPattern.exec(agentResponse)) !== null) {
    const targetName = match[1].trim().toLowerCase().replace(/\s+/g, '-')
    handoffs.push({
      targetAgent: targetName,
      request: match[2].trim(),
    })
  }

  return handoffs.length > 0 ? handoffs : null
}
