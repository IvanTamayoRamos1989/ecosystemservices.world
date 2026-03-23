import React, { useState } from 'react'
import { toCSV, downloadFile, autoAssignCosts } from '../../lib/decarbEngine'

function ScopeBar({ label, value, total, color }) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-label uppercase text-slate w-28">{label}</span>
      <div className="flex-1 h-6 bg-sovereign-ash relative">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <span className="font-mono text-sm text-navy w-28 text-right">{value.toLocaleString('es-ES', { maximumFractionDigits: 1 })} t</span>
      <span className="text-xs text-slate w-12 text-right">{pct.toFixed(1)}%</span>
    </div>
  )
}

export default function CalculationTable({
  results, summary, diagnostic, measures, setMeasures, onGenerateReport
}) {
  const [activeTab, setActiveTab] = useState('inventario')

  const exportInventory = () => {
    const headers = ['Fuente', 'Scope', 'Categoría', 'Cantidad', 'Unidad', 'Factor', 'GWP', 'tCO2e']
    const rows = results.map(r => ({
      'Fuente': r.nombre, 'Scope': r.scope, 'Categoría': r.categoria,
      'Cantidad': r.cantidad, 'Unidad': r.unidad, 'Factor': r.factor_emision,
      'GWP': r.gwp, 'tCO2e': r.tCO2e,
    }))
    downloadFile(toCSV(headers, rows), 'inventario_emisiones.csv')
  }

  const exportMeasures = () => {
    const headers = ['ID', 'Medida', 'Fuente', 'Palanca', 'Horizonte', 'tCO2e/año', 'Vida útil', 'CAPEX (€)', 'Ahorro anual (€)']
    const rows = measures.map(m => ({
      'ID': m.id, 'Medida': m.nombre, 'Fuente': m.source_nombre,
      'Palanca': m.palanca, 'Horizonte': m.horizonte,
      'tCO2e/año': m.tCO2e_anuales, 'Vida útil': m.vida_util_anios,
      'CAPEX (€)': m.capex_eur, 'Ahorro anual (€)': m.ahorro_anual_eur,
    }))
    downloadFile(toCSV(headers, rows), 'medidas_reduccion.csv')
  }

  const updateMeasure = (index, field, value) => {
    const updated = [...measures]
    updated[index] = { ...updated[index], [field]: value }
    setMeasures(updated)
  }

  const applyDefaultCosts = () => {
    setMeasures(autoAssignCosts(measures))
  }

  const hasCosts = measures.some(m => m.capex_eur > 0 || m.ahorro_anual_eur > 0)

  const tabs = [
    { id: 'inventario', label: 'Inventario GEI' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'medidas', label: 'Medidas de Reducción' },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total emisiones', value: `${summary.total.toLocaleString('es-ES', { maximumFractionDigits: 1 })}`, unit: 'tCO2e' },
          { label: 'Scope 1', value: `${summary.scope_1.toLocaleString('es-ES', { maximumFractionDigits: 1 })}`, unit: 'tCO2e' },
          { label: 'Scope 2 (LBM)', value: `${summary.scope_2_lbm.toLocaleString('es-ES', { maximumFractionDigits: 1 })}`, unit: 'tCO2e' },
          { label: 'Fuentes analizadas', value: results.length, unit: '' },
        ].map((card, i) => (
          <div key={i} className="border border-sovereign-silver p-4">
            <p className="text-label uppercase text-slate">{card.label}</p>
            <p className="font-mono text-metric text-navy mt-1">{card.value}</p>
            {card.unit && <p className="text-xs text-slate">{card.unit}</p>}
          </div>
        ))}
      </div>

      {/* Scope Distribution */}
      <div className="border border-sovereign-silver p-6">
        <h4 className="text-label uppercase text-slate mb-4">Distribución por Scope</h4>
        <div className="space-y-3">
          <ScopeBar label="Scope 1" value={summary.scope_1} total={summary.total} color="bg-navy" />
          <ScopeBar label="Scope 2 (LBM)" value={summary.scope_2_lbm} total={summary.total} color="bg-navy-600" />
          {summary.scope_3 > 0 && (
            <ScopeBar label="Scope 3" value={summary.scope_3} total={summary.total} color="bg-navy-400" />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-navy flex gap-0">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`text-label uppercase px-6 py-3 transition-colors ${
              activeTab === tab.id
                ? 'bg-navy text-white'
                : 'text-slate hover:text-navy'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Inventario */}
      {activeTab === 'inventario' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-serif text-lg text-navy">Resultado del Cálculo de Emisiones</h4>
            <button onClick={exportInventory}
              className="text-label uppercase px-4 py-2 border border-sovereign-silver text-slate hover:text-navy hover:border-navy transition-colors">
              Descargar CSV
            </button>
          </div>
          <div className="overflow-x-auto border border-sovereign-silver">
            <table className="w-full sovereign-table text-sm">
              <thead>
                <tr className="bg-sovereign-ash">
                  <th>Fuente de Emisión</th>
                  <th>Scope</th>
                  <th>Categoría</th>
                  <th className="text-right">Dato Actividad</th>
                  <th className="text-right">Factor (kg/u)</th>
                  <th className="text-right">GWP</th>
                  <th className="text-right">tCO2e</th>
                  <th className="text-right">% Total</th>
                </tr>
              </thead>
              <tbody>
                {[...results].sort((a, b) => b.tCO2e - a.tCO2e).map(r => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.nombre}</td>
                    <td><span className={`inline-block px-2 py-0.5 text-xs font-mono ${
                      r.scope === 1 ? 'bg-navy text-white' : r.scope === 2 ? 'bg-navy-600 text-white' : 'bg-navy-400 text-white'
                    }`}>Scope {r.scope}</span></td>
                    <td className="text-slate">{r.categoria.replace(/_/g, ' ')}</td>
                    <td className="text-right font-mono">{r.cantidad.toLocaleString('es-ES')}</td>
                    <td className="text-right font-mono">{r.factor_emision}</td>
                    <td className="text-right font-mono">{r.gwp}</td>
                    <td className="text-right font-mono font-medium">{r.tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</td>
                    <td className="text-right font-mono text-slate">{((r.tCO2e / summary.total) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-navy bg-sovereign-ash">
                  <td colSpan={6} className="font-semibold text-navy">TOTAL</td>
                  <td className="text-right font-mono font-bold text-navy">{summary.total.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</td>
                  <td className="text-right font-mono font-bold text-navy">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Diagnóstico */}
      {activeTab === 'diagnostico' && diagnostic && (
        <div className="space-y-6">
          <h4 className="font-serif text-lg text-navy">Fuentes Prioritarias (Fase 2 — Diagnóstico)</h4>
          <div className="space-y-4">
            {diagnostic.priorities.map((p, i) => (
              <div key={i} className="border border-sovereign-silver p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-label uppercase text-slate">#{i + 1}</span>
                    <h5 className="font-medium text-navy">{p.nombre}</h5>
                    <p className="text-sm text-slate">Scope {p.scope} — {p.porcentaje}% del total</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xl text-navy">{p.tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</p>
                    <p className="text-xs text-slate">tCO2e</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-sovereign-silver">
                  <p className="text-label uppercase text-slate mb-2">Alternativas sugeridas:</p>
                  <div className="space-y-1">
                    {p.alternatives.map((alt, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <span className={`text-xs px-2 py-0.5 ${
                          alt.horizonte === 'Corto plazo' ? 'bg-status-active text-white' :
                          alt.horizonte === 'Medio plazo' ? 'bg-status-pending text-white' :
                          'bg-navy-400 text-white'
                        }`}>{alt.horizonte}</span>
                        <span className="text-charcoal">{alt.medida}</span>
                        <span className="text-xs text-slate ml-auto">{alt.palanca}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trajectory */}
          {diagnostic.trajectory && (
            <div className="border border-sovereign-silver p-6">
              <h4 className="text-label uppercase text-slate mb-3">Trayectoria de Reducción (SBTi 1.5°C)</h4>
              <div className="flex items-end gap-1 h-40">
                {Object.entries(diagnostic.trajectory).sort(([a], [b]) => a - b).map(([year, value]) => {
                  const maxVal = Math.max(...Object.values(diagnostic.trajectory))
                  const heightPct = maxVal > 0 ? (value / maxVal) * 100 : 0
                  return (
                    <div key={year} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-mono text-navy">{value.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</span>
                      <div className="w-full bg-navy" style={{ height: `${heightPct}%`, minHeight: '4px' }} />
                      <span className="text-xs text-slate">{year}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Medidas */}
      {activeTab === 'medidas' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-serif text-lg text-navy">Medidas de Reducción (Fase 3 + Fase 4)</h4>
            <div className="flex gap-2">
              <button onClick={applyDefaultCosts}
                className="text-label uppercase px-4 py-2 border border-sovereign-silver text-slate hover:text-navy hover:border-navy transition-colors">
                Auto-asignar Costes
              </button>
              <button onClick={exportMeasures}
                className="text-label uppercase px-4 py-2 border border-sovereign-silver text-slate hover:text-navy hover:border-navy transition-colors">
                Descargar CSV
              </button>
            </div>
          </div>

          <p className="text-sm text-slate mb-4">
            Edite CAPEX y Ahorro anual para cada medida. Se calcularán automáticamente el Coste Neto y MACC.
          </p>

          <div className="overflow-x-auto border border-sovereign-silver">
            <table className="w-full sovereign-table text-sm">
              <thead>
                <tr className="bg-sovereign-ash">
                  <th>ID</th>
                  <th>Medida</th>
                  <th>Fuente</th>
                  <th>Horizonte</th>
                  <th className="text-right">tCO2e/año</th>
                  <th className="text-right">Vida útil</th>
                  <th className="text-right">CAPEX (€)</th>
                  <th className="text-right">Ahorro/año (€)</th>
                </tr>
              </thead>
              <tbody>
                {measures.map((m, i) => (
                  <tr key={m.id}>
                    <td className="font-mono text-xs text-slate">{m.id}</td>
                    <td className="font-medium">{m.nombre}</td>
                    <td className="text-slate text-xs">{m.source_nombre}</td>
                    <td>
                      <span className={`text-xs px-2 py-0.5 ${
                        m.horizonte === 'Corto plazo' ? 'bg-status-active text-white' :
                        m.horizonte === 'Medio plazo' ? 'bg-status-pending text-white' :
                        'bg-navy-400 text-white'
                      }`}>{m.horizonte}</span>
                    </td>
                    <td className="text-right font-mono">{m.tCO2e_anuales}</td>
                    <td className="text-right font-mono">{m.vida_util_anios}</td>
                    <td className="text-right">
                      <input type="number" value={m.capex_eur}
                        onChange={e => updateMeasure(i, 'capex_eur', parseFloat(e.target.value) || 0)}
                        className="w-28 border border-sovereign-silver px-2 py-1 text-right font-mono text-sm focus:border-navy focus:outline-none" />
                    </td>
                    <td className="text-right">
                      <input type="number" value={m.ahorro_anual_eur}
                        onChange={e => updateMeasure(i, 'ahorro_anual_eur', parseFloat(e.target.value) || 0)}
                        className="w-28 border border-sovereign-silver px-2 py-1 text-right font-mono text-sm focus:border-navy focus:outline-none" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proceed to Report */}
      <div className="flex justify-end pt-4 border-t border-sovereign-silver">
        <button
          disabled={!hasCosts}
          onClick={onGenerateReport}
          className={`text-label uppercase px-8 py-3 transition-colors ${
            hasCosts
              ? 'bg-navy text-white hover:bg-navy-800'
              : 'bg-sovereign-silver text-slate cursor-not-allowed'
          }`}
        >
          Generar Informe de Descarbonización →
        </button>
      </div>
    </div>
  )
}
