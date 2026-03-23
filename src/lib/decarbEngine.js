/**
 * Decarbonization Engine — Client-side GHG Protocol calculations
 *
 * Mirrors the Python engine (agents/decarbonization/) for browser execution.
 * All formulas from the technical specification:
 *   Emisiones (tCO2e) = Dato_Actividad * Factor_Emision * GWP * Factor_Consolidacion
 *   Coste_Neto = CAPEX - (Ahorro_Operativo_Anual * Vida_Util)
 *   MACC = Coste_Neto / tCO2e_evitadas_acumuladas
 */

// ── Default emission factors (kgCO2e per unit) ──────────────────────
const DEFAULT_FACTORS = {
  electricidad_kwh: { factor: 0.150, gwp: 1.0, source: 'REE/MITECO 2023' },
  gas_natural_m3: { factor: 2.0, gwp: 1.0, source: 'DEFRA 2023' },
  gas_natural_kwh: { factor: 0.182, gwp: 1.0, source: 'DEFRA 2023' },
  diesel_litros: { factor: 2.68, gwp: 1.0, source: 'DEFRA 2023' },
  gasolina_litros: { factor: 2.31, gwp: 1.0, source: 'DEFRA 2023' },
  fueloil_litros: { factor: 3.15, gwp: 1.0, source: 'DEFRA 2023' },
  glp_litros: { factor: 1.56, gwp: 1.0, source: 'DEFRA 2023' },
  r410a_kg: { factor: 1.0, gwp: 2088.0, source: 'IPCC AR6' },
  r134a_kg: { factor: 1.0, gwp: 1430.0, source: 'IPCC AR6' },
  r404a_kg: { factor: 1.0, gwp: 3922.0, source: 'IPCC AR6' },
}

// ── Phase 1: Calculate emissions ─────────────────────────────────────
export function calculateEmissions(sources, consolidationPct = 100) {
  const factor = consolidationPct / 100
  return sources.map(src => {
    const ef = DEFAULT_FACTORS[src.factor_key] || { factor: src.custom_factor || 0, gwp: src.custom_gwp || 1 }
    const tCO2e = (src.cantidad * ef.factor * ef.gwp * factor) / 1000
    return {
      ...src,
      tCO2e: Math.round(tCO2e * 100) / 100,
      factor_emision: ef.factor,
      gwp: ef.gwp,
      factor_source: ef.source || 'Custom',
    }
  })
}

export function summarizeByScope(results) {
  const summary = { scope_1: 0, scope_2_lbm: 0, scope_2_mbm: 0, scope_3: 0 }
  results.forEach(r => {
    if (r.scope === 1) summary.scope_1 += r.tCO2e
    else if (r.scope === 2) {
      if (r.scope2_method === 'MBM') summary.scope_2_mbm += r.tCO2e
      else summary.scope_2_lbm += r.tCO2e
    }
    else if (r.scope === 3) summary.scope_3 += r.tCO2e
  })
  summary.total = summary.scope_1 + summary.scope_2_lbm + summary.scope_3
  return summary
}

// ── Phase 2: Diagnostic — identify top sources ───────────────────────
export function runDiagnostic(results, targetPct = 42, baseYear = 2023, targetYear = 2030) {
  const total = results.reduce((sum, r) => sum + r.tCO2e, 0)
  if (total <= 0) return { priorities: [], trajectory: {}, targetPct }

  // Aggregate by source name
  const bySource = {}
  results.forEach(r => {
    const key = r.nombre || r.id
    if (!bySource[key]) bySource[key] = { ...r, tCO2e: 0 }
    bySource[key].tCO2e += r.tCO2e
  })

  const ranked = Object.values(bySource).sort((a, b) => b.tCO2e - a.tCO2e)
  let accumulated = 0
  const priorities = []
  for (const src of ranked) {
    if (accumulated / total >= 0.80 && priorities.length >= 3) break
    if (priorities.length >= 5) break
    const pct = (src.tCO2e / total) * 100
    priorities.push({
      ...src,
      porcentaje: Math.round(pct * 10) / 10,
      alternatives: suggestAlternatives(src.categoria),
      reduction_potential: estimateReduction(src.categoria, src.tCO2e),
    })
    accumulated += src.tCO2e
  }

  // Linear trajectory
  const trajectory = {}
  const horizonte = targetYear - baseYear
  const tasa = targetPct / horizonte / 100
  trajectory[baseYear] = Math.round(total * 10) / 10
  const milestones = [baseYear + 2, 2025, 2030, 2035, targetYear]
  milestones.forEach(yr => {
    if (yr <= baseYear || yr > targetYear) return
    const elapsed = yr - baseYear
    trajectory[yr] = Math.round(total * Math.max(1 - tasa * elapsed, 0) * 10) / 10
  })

  return { priorities, trajectory, targetPct, total }
}

function suggestAlternatives(categoria) {
  const cat = (categoria || '').toLowerCase()
  if (cat.includes('electric') || cat.includes('grid') || cat.includes('comprada'))
    return [
      { medida: 'Contrato PPA de electricidad 100% renovable', palanca: 'Renovables', horizonte: 'Corto plazo' },
      { medida: 'Instalación fotovoltaica de autoconsumo', palanca: 'Renovables', horizonte: 'Medio plazo' },
      { medida: 'Eficiencia energética (LED, HVAC, BMS)', palanca: 'Eficiencia', horizonte: 'Corto plazo' },
    ]
  if (cat.includes('gas') || cat.includes('caldera') || cat.includes('termic'))
    return [
      { medida: 'Eficiencia térmica (aislamiento + recuperación de calor)', palanca: 'Eficiencia', horizonte: 'Corto plazo' },
      { medida: 'Electrificación de calderas (bomba de calor)', palanca: 'Electrificación', horizonte: 'Medio plazo' },
      { medida: 'Sustitución por biogás o hidrógeno verde', palanca: 'Sustitución', horizonte: 'Largo plazo' },
    ]
  if (cat.includes('transport') || cat.includes('vehicul') || cat.includes('flota') || cat.includes('diesel') || cat.includes('gasolin'))
    return [
      { medida: 'Electrificación de flota (BEV)', palanca: 'Electrificación', horizonte: 'Medio plazo' },
      { medida: 'Optimización de rutas y eco-driving', palanca: 'Eficiencia', horizonte: 'Corto plazo' },
      { medida: 'Combustibles alternativos (HVO)', palanca: 'Sustitución', horizonte: 'Corto plazo' },
    ]
  if (cat.includes('refrig') || cat.includes('fugitiv'))
    return [
      { medida: 'Sustitución de refrigerantes de alto GWP', palanca: 'Sustitución', horizonte: 'Medio plazo' },
      { medida: 'Mejora de estanqueidad y mantenimiento', palanca: 'Eficiencia', horizonte: 'Corto plazo' },
    ]
  return [{ medida: 'Auditoría energética específica', palanca: 'Eficiencia', horizonte: 'Corto plazo' }]
}

function estimateReduction(categoria, tCO2e) {
  const cat = (categoria || '').toLowerCase()
  if (cat.includes('electric') || cat.includes('grid')) return Math.round(tCO2e * 0.9 * 10) / 10
  if (cat.includes('gas') || cat.includes('caldera')) return Math.round(tCO2e * 0.6 * 10) / 10
  if (cat.includes('transport') || cat.includes('vehicul')) return Math.round(tCO2e * 0.5 * 10) / 10
  return Math.round(tCO2e * 0.3 * 10) / 10
}

// ── Phase 3: Pathway — build reduction plan ──────────────────────────
export function buildPathway(diagnostic) {
  const measures = []
  let counter = 0
  diagnostic.priorities.forEach(src => {
    (src.alternatives || []).forEach(alt => {
      counter++
      const vidaUtil = alt.horizonte === 'Corto plazo' ? 10 : alt.horizonte === 'Medio plazo' ? 12 : 15
      const reductionShare = alt.horizonte === 'Corto plazo' ? 0.15 : alt.horizonte === 'Medio plazo' ? 0.30 : 0.20
      measures.push({
        id: `M-${String(counter).padStart(3, '0')}`,
        nombre: alt.medida,
        palanca: alt.palanca,
        horizonte: alt.horizonte,
        source_nombre: src.nombre,
        scope: src.scope,
        tCO2e_anuales: Math.round(src.tCO2e * reductionShare * 10) / 10,
        vida_util_anios: vidaUtil,
        capex_eur: 0,
        ahorro_anual_eur: 0,
      })
    })
  })
  return measures
}

// ── Phase 4: Financial / MACC ────────────────────────────────────────
export function calculateMACC(measures) {
  const entries = measures
    .filter(m => m.capex_eur > 0 || m.ahorro_anual_eur > 0)
    .map(m => {
      const acumuladas = m.tCO2e_anuales * m.vida_util_anios
      const costeNeto = m.capex_eur - (m.ahorro_anual_eur * m.vida_util_anios)
      const macc = acumuladas > 0 ? costeNeto / acumuladas : Infinity
      const payback = m.ahorro_anual_eur > 0 ? m.capex_eur / m.ahorro_anual_eur : Infinity
      return {
        ...m,
        tCO2e_acumuladas: Math.round(acumuladas * 10) / 10,
        coste_neto_eur: Math.round(costeNeto * 100) / 100,
        macc_eur_tCO2e: Math.round(macc * 100) / 100,
        payback_anios: Math.round(payback * 10) / 10,
      }
    })
    .sort((a, b) => a.macc_eur_tCO2e - b.macc_eur_tCO2e)

  // Build curve coordinates
  let cumulative = 0
  const curve = entries.map(e => {
    const x_start = cumulative
    cumulative += e.tCO2e_acumuladas
    return { ...e, x_start: Math.round(x_start), x_end: Math.round(cumulative) }
  })

  const totalReduction = entries.reduce((s, e) => s + e.tCO2e_acumuladas, 0)
  const totalInvestment = entries.reduce((s, e) => s + e.capex_eur, 0)

  return {
    ranking: curve,
    reduccion_total_tCO2e: Math.round(totalReduction * 10) / 10,
    inversion_total_eur: Math.round(totalInvestment),
    coste_medio: totalReduction > 0 ? Math.round((totalInvestment / totalReduction) * 100) / 100 : 0,
    medidas_ahorro: entries.filter(e => e.macc_eur_tCO2e < 0).length,
  }
}

// ── CSV Parser ───────────────────────────────────────────────────────
export function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(/[,;\t]/).map(h => h.trim().toLowerCase().replace(/['"]/g, ''))
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const values = line.split(/[,;\t]/).map(v => v.trim().replace(/['"]/g, ''))
    const row = {}
    headers.forEach((h, i) => {
      const val = values[i] || ''
      row[h] = isNaN(val) || val === '' ? val : parseFloat(val)
    })
    return row
  })
}

// ── CSV/Excel Export ─────────────────────────────────────────────────
export function toCSV(headers, rows) {
  const headerLine = headers.join(';')
  const dataLines = rows.map(row => headers.map(h => row[h] ?? '').join(';'))
  return '\uFEFF' + [headerLine, ...dataLines].join('\n')
}

export function downloadFile(content, filename, mime = 'text/csv;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── Default cost catalog for auto-populating economics ───────────────
export const COST_CATALOG = {
  'PPA': { capex: 15000, ahorro: 80000 },
  'fotovoltaica': { capex: 450000, ahorro: 55000 },
  'eficiencia energética': { capex: 120000, ahorro: 45000 },
  'eficiencia térmica': { capex: 95000, ahorro: 35000 },
  'bomba de calor': { capex: 600000, ahorro: 40000 },
  'biogás': { capex: 350000, ahorro: 15000 },
  'hidrógeno': { capex: 350000, ahorro: 15000 },
  'BEV': { capex: 900000, ahorro: 60000 },
  'eco-driving': { capex: 25000, ahorro: 15000 },
  'HVO': { capex: 10000, ahorro: 5000 },
  'refrigerantes': { capex: 80000, ahorro: 10000 },
  'estanqueidad': { capex: 30000, ahorro: 8000 },
  'Auditoría': { capex: 40000, ahorro: 12000 },
}

export function autoAssignCosts(measures) {
  return measures.map(m => {
    const name = m.nombre.toLowerCase()
    for (const [key, costs] of Object.entries(COST_CATALOG)) {
      if (name.includes(key.toLowerCase())) {
        return { ...m, capex_eur: costs.capex, ahorro_anual_eur: costs.ahorro }
      }
    }
    return { ...m, capex_eur: 50000, ahorro_anual_eur: 10000 }
  })
}
