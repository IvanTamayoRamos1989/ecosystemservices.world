import React, { useRef } from 'react'

function MACCBar({ entry, maxAbsMACC }) {
  const barHeight = maxAbsMACC > 0 ? Math.abs(entry.macc_eur_tCO2e) / maxAbsMACC * 100 : 0
  const isNegative = entry.macc_eur_tCO2e < 0
  return (
    <div className="flex flex-col items-center flex-1 min-w-[60px]" title={`${entry.nombre}\n${entry.macc_eur_tCO2e} €/tCO2e`}>
      {/* Positive area */}
      <div className="h-24 w-full flex items-end justify-center">
        {!isNegative && (
          <div className="w-4/5 bg-status-blocked opacity-70" style={{ height: `${barHeight}%`, minHeight: barHeight > 0 ? '2px' : '0' }} />
        )}
      </div>
      {/* Zero line */}
      <div className="w-full h-px bg-navy" />
      {/* Negative area (savings) */}
      <div className="h-24 w-full flex items-start justify-center">
        {isNegative && (
          <div className="w-4/5 bg-status-active opacity-70" style={{ height: `${barHeight}%`, minHeight: barHeight > 0 ? '2px' : '0' }} />
        )}
      </div>
      <span className="text-[9px] text-slate mt-1 text-center leading-tight truncate w-full px-0.5">
        {entry.nombre.length > 20 ? entry.nombre.slice(0, 20) + '…' : entry.nombre}
      </span>
    </div>
  )
}

export default function ReportOutput({ orgData, summary, diagnostic, macc, results }) {
  const reportRef = useRef(null)

  const downloadPDF = () => {
    const el = reportRef.current
    if (!el) return
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head>
        <title>Informe de Descarbonización — ${orgData.nombre || 'ESW'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=EB+Garamond:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; color: #1E293B; font-size: 11px; line-height: 1.5; padding: 30px; }
          h1 { font-family: 'EB Garamond', serif; font-size: 28px; color: #0A1628; margin-bottom: 4px; }
          h2 { font-family: 'EB Garamond', serif; font-size: 18px; color: #0A1628; margin: 24px 0 8px; border-bottom: 2px solid #0A1628; padding-bottom: 4px; }
          h3 { font-size: 13px; font-weight: 600; color: #0A1628; margin: 16px 0 6px; text-transform: uppercase; letter-spacing: 0.05em; }
          .subtitle { font-size: 12px; color: #5A6577; margin-bottom: 20px; }
          .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0; }
          .metric-card { border: 1px solid #E2E5EA; padding: 12px; }
          .metric-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; color: #5A6577; }
          .metric-value { font-family: 'JetBrains Mono', monospace; font-size: 22px; color: #0A1628; }
          .metric-unit { font-size: 10px; color: #5A6577; }
          table { width: 100%; border-collapse: collapse; font-size: 10px; margin: 8px 0; }
          th { background: #F4F5F7; font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #5A6577; text-align: left; padding: 6px 8px; border-bottom: 2px solid #0A1628; }
          td { padding: 5px 8px; border-bottom: 1px solid #E2E5EA; }
          .text-right { text-align: right; }
          .mono { font-family: 'JetBrains Mono', monospace; }
          .badge { display: inline-block; padding: 1px 6px; font-size: 9px; color: white; }
          .badge-green { background: #1B5E20; }
          .badge-amber { background: #B45309; }
          .badge-blue { background: #415580; }
          .badge-navy { background: #0A1628; }
          .roadmap-phase { margin: 12px 0; padding: 12px; border: 1px solid #E2E5EA; }
          .roadmap-title { font-weight: 600; color: #0A1628; font-size: 12px; }
          .footer { margin-top: 40px; padding-top: 12px; border-top: 2px solid #0A1628; font-size: 9px; color: #5A6577; display: flex; justify-content: space-between; }
          .positive { color: #991B1B; }
          .negative { color: #1B5E20; }
          .page-break { page-break-before: always; }
          @media print { body { padding: 20px; } .page-break { page-break-before: always; } }
        </style>
      </head><body>
        ${el.innerHTML}
      </body></html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const maxAbsMACC = macc.ranking.length > 0
    ? Math.max(...macc.ranking.map(e => Math.abs(e.macc_eur_tCO2e)))
    : 1

  return (
    <div className="space-y-6">
      {/* Download button */}
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-xl text-navy">Informe de Descarbonización</h3>
        <button onClick={downloadPDF}
          className="text-label uppercase px-6 py-3 bg-navy text-white hover:bg-navy-800 transition-colors">
          Descargar PDF
        </button>
      </div>

      {/* Report content */}
      <div ref={reportRef} className="bg-white border border-sovereign-silver p-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-navy">Plan de Descarbonización</h1>
          <p className="text-sm text-slate">{orgData.nombre || 'Organización'} — {orgData.pais} — {orgData.sector} — Año base: {orgData.anio}</p>
          <p className="text-xs text-slate mt-1">Metodología: GHG Protocol Corporate Standard | Objetivo: SBTi 1.5°C ({diagnostic.targetPct}% reducción para {Math.max(...Object.keys(diagnostic.trajectory || { 2030: 0 }).map(Number))})</p>
        </div>

        {/* KPIs */}
        <div>
          <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Resumen Ejecutivo</h2>
          <div className="metric-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Emisiones base', value: summary.total.toLocaleString('es-ES', { maximumFractionDigits: 1 }), unit: 'tCO2e' },
              { label: 'Reducción acumulada', value: macc.reduccion_total_tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 1 }), unit: 'tCO2e (vida útil)' },
              { label: 'Inversión total', value: macc.inversion_total_eur.toLocaleString('es-ES'), unit: '€' },
              { label: 'Coste medio', value: macc.coste_medio.toLocaleString('es-ES', { maximumFractionDigits: 2 }), unit: '€/tCO2e' },
            ].map((m, i) => (
              <div key={i} className="border border-sovereign-silver p-3">
                <p className="text-label uppercase text-slate text-xs">{m.label}</p>
                <p className="font-mono text-2xl text-navy">{m.value}</p>
                <p className="text-xs text-slate">{m.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scope breakdown */}
        <div>
          <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Inventario de Emisiones GEI</h2>
          <table className="w-full sovereign-table text-sm">
            <thead>
              <tr className="bg-sovereign-ash">
                <th>Fuente de Emisión</th>
                <th>Scope</th>
                <th className="text-right">tCO2e</th>
                <th className="text-right">% Total</th>
              </tr>
            </thead>
            <tbody>
              {[...results].sort((a, b) => b.tCO2e - a.tCO2e).map(r => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td><span className={`inline-block px-2 py-0.5 text-xs text-white ${
                    r.scope === 1 ? 'badge-navy bg-navy' : r.scope === 2 ? 'bg-navy-600' : 'bg-navy-400'
                  }`}>Scope {r.scope}</span></td>
                  <td className="text-right font-mono">{r.tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</td>
                  <td className="text-right font-mono text-slate">{((r.tCO2e / summary.total) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-navy">
                <td colSpan={2} className="font-semibold text-navy">TOTAL</td>
                <td className="text-right font-mono font-bold text-navy">{summary.total.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</td>
                <td className="text-right font-mono font-bold text-navy">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Trajectory */}
        {diagnostic.trajectory && (
          <div>
            <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Senda de Descarbonización (SBTi 1.5°C)</h2>
            <table className="w-full sovereign-table text-sm">
              <thead>
                <tr className="bg-sovereign-ash">
                  <th>Año</th>
                  <th className="text-right">Objetivo (tCO2e)</th>
                  <th className="text-right">Reducción vs. base</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(diagnostic.trajectory).sort(([a], [b]) => a - b).map(([year, value]) => (
                  <tr key={year}>
                    <td className="font-mono">{year}</td>
                    <td className="text-right font-mono">{value.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</td>
                    <td className="text-right font-mono text-slate">
                      {diagnostic.total > 0 ? `-${((1 - value / diagnostic.total) * 100).toFixed(1)}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MACC Curve */}
        <div>
          <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Curva de Costes Marginales de Abatimiento (MACC)</h2>
          <div className="border border-sovereign-silver p-4">
            <div className="flex items-center gap-4 mb-2 text-xs text-slate">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-status-active opacity-70 inline-block" /> Ahorro neto (€/tCO2e &lt; 0)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-status-blocked opacity-70 inline-block" /> Coste neto (€/tCO2e &gt; 0)</span>
            </div>
            <div className="flex items-stretch gap-0.5 px-2">
              {macc.ranking.map((entry, i) => (
                <MACCBar key={i} entry={entry} maxAbsMACC={maxAbsMACC} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate">
              <span>← Menor coste</span>
              <span>tCO2e acumuladas →</span>
            </div>
          </div>
        </div>

        {/* Ranking table */}
        <div>
          <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Ranking de Medidas</h2>
          <table className="w-full sovereign-table text-sm">
            <thead>
              <tr className="bg-sovereign-ash">
                <th>#</th>
                <th>Medida</th>
                <th>Horizonte</th>
                <th className="text-right">tCO2e/año</th>
                <th className="text-right">CAPEX (€)</th>
                <th className="text-right">Coste Neto (€)</th>
                <th className="text-right">MACC (€/tCO2e)</th>
                <th className="text-right">Payback</th>
              </tr>
            </thead>
            <tbody>
              {macc.ranking.map((e, i) => (
                <tr key={e.id}>
                  <td className="font-mono text-slate">{i + 1}</td>
                  <td className="font-medium">{e.nombre}</td>
                  <td>
                    <span className={`text-xs px-2 py-0.5 text-white ${
                      e.horizonte === 'Corto plazo' ? 'bg-status-active' :
                      e.horizonte === 'Medio plazo' ? 'bg-status-pending' : 'bg-navy-400'
                    }`}>{e.horizonte}</span>
                  </td>
                  <td className="text-right font-mono">{e.tCO2e_anuales.toLocaleString('es-ES')}</td>
                  <td className="text-right font-mono">{e.capex_eur.toLocaleString('es-ES')}</td>
                  <td className={`text-right font-mono ${e.coste_neto_eur < 0 ? 'text-status-active' : 'text-status-blocked'}`}>
                    {e.coste_neto_eur.toLocaleString('es-ES')}
                  </td>
                  <td className={`text-right font-mono font-medium ${e.macc_eur_tCO2e < 0 ? 'text-status-active' : 'text-status-blocked'}`}>
                    {e.macc_eur_tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="text-right font-mono text-slate">
                    {e.payback_anios === Infinity ? '—' : `${e.payback_anios} años`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Roadmap */}
        <div>
          <h2 className="font-serif text-xl text-navy border-b-2 border-navy pb-1 mb-4">Roadmap de Implementación</h2>
          {['Corto plazo', 'Medio plazo', 'Largo plazo'].map(horizonte => {
            const items = macc.ranking.filter(e => e.horizonte === horizonte)
            if (items.length === 0) return null
            const investment = items.reduce((s, e) => s + e.capex_eur, 0)
            const reduction = items.reduce((s, e) => s + e.tCO2e_anuales, 0)
            return (
              <div key={horizonte} className="border border-sovereign-silver p-4 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium text-sm ${
                    horizonte === 'Corto plazo' ? 'text-status-active' :
                    horizonte === 'Medio plazo' ? 'text-status-pending' : 'text-navy-400'
                  }`}>{horizonte}</span>
                  <div className="text-right text-xs text-slate">
                    <span className="font-mono">{investment.toLocaleString('es-ES')} €</span> inversión · <span className="font-mono">{reduction.toLocaleString('es-ES')} tCO2e/año</span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item.id} className="text-sm text-charcoal flex justify-between">
                      <span>· {item.nombre}</span>
                      <span className="font-mono text-xs text-slate">{item.macc_eur_tCO2e.toLocaleString('es-ES', { maximumFractionDigits: 2 })} €/tCO2e</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-navy pt-3 mt-8 flex justify-between text-xs text-slate">
          <span>ESW — Ecosystem Services World · ecosystemservices.world</span>
          <span>Generado: {new Date().toLocaleDateString('es-ES')} · Metodología: GHG Protocol + SBTi 1.5°C</span>
        </div>
      </div>
    </div>
  )
}
