import React, { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

// ── Portfolio Assets (Digital Twin representations) ───────────────────
const PORTFOLIO_ASSETS = [
  {
    id: 'AST-001',
    name: 'Corredores Verdes — Culiacán',
    jurisdiction: 'Mexico (Sinaloa)',
    hectares: 95200,
    biome: 'Urban NbS / Tropical Dry',
    status: 'Active',
    carbonSequestered: 550,
    biodiversityScore: 7.8,
    creditsPipeline: '$35–50M',
    complianceFrameworks: ['NOM-004-SEDATU', 'Plan Avanza', 'LGEEPA', 'IUCN NbS', 'IDB ESPF'],
    verificationStatus: 'CFF Structuring Phase',
    lastUpdated: '2026-02-21',
  },
  {
    id: 'AST-002',
    name: 'Solar Biodiversity — Algarve',
    jurisdiction: 'Portugal',
    hectares: 3200,
    biome: 'Mediterranean Shrubland',
    status: 'Active',
    carbonSequestered: 12800,
    biodiversityScore: 6.4,
    creditsPipeline: '$1.8M',
    complianceFrameworks: ['CSRD', 'EU Taxonomy', 'TNFD'],
    verificationStatus: 'Under Review',
    lastUpdated: '2026-02-10',
  },
  {
    id: 'AST-003',
    name: 'Mangrove Restoration — Mombasa',
    jurisdiction: 'Kenya',
    hectares: 8600,
    biome: 'Coastal Mangrove',
    status: 'Verified',
    carbonSequestered: 64000,
    biodiversityScore: 8.9,
    creditsPipeline: '$6.1M',
    complianceFrameworks: ['Verra VCS', 'Gold Standard'],
    verificationStatus: 'All stamps verified',
    lastUpdated: '2026-02-12',
  },
  {
    id: 'AST-004',
    name: 'Arid Restoration — Marrakech',
    jurisdiction: 'Morocco',
    hectares: 15800,
    biome: 'Arid / Semi-Arid',
    status: 'Pipeline',
    carbonSequestered: 0,
    biodiversityScore: 3.2,
    creditsPipeline: '$2.4M (est.)',
    complianceFrameworks: ['ISSB', 'Plan Vivo'],
    verificationStatus: 'Not started',
    lastUpdated: '2026-02-08',
  },
]

// ── Aggregate metrics ─────────────────────────────────────────────────
const PORTFOLIO_SUMMARY = [
  { label: 'Total Area Under Management', value: '40,000', delta: '+95,200 m² (Culiacán)' },
  { label: 'Carbon Capture Pipeline (tCO₂/yr)', value: '125,550', delta: '+550 (Culiacán NbS)' },
  { label: 'Capital Stack Value', value: '$50M+', delta: 'Culiacán: $35–50M structured' },
  { label: 'Active Financier Relationships', value: '8', delta: 'C40 CFF · CAF · GCF · Banobras' },
]

const STATUS_STYLES = {
  Active: 'text-status-active bg-emerald-50',
  Verified: 'text-navy bg-navy-50',
  Pipeline: 'text-status-pending bg-amber-50',
}

function useCounter(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true

    const numTarget = typeof target === 'string' ? parseFloat(target.replace(/[^0-9.]/g, '')) : target
    if (isNaN(numTarget)) { setCount(target); return }

    let start = 0
    const increment = numTarget / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numTarget) {
        setCount(numTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

function ClientDashboard() {
  const [ref, visible] = useReveal(0.1)
  const [selectedAsset, setSelectedAsset] = useState(null)

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="mb-12">
          <div className="sovereign-rule pt-6 mb-4">
            <span className="text-label uppercase text-slate tracking-widest">Client Platform</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
                Assets Under Management
              </h2>
              <p className="text-sm text-slate mt-2">
                Real-time portfolio view across all active nature assets
              </p>
            </div>
            <span className="hidden md:block text-label uppercase text-slate">
              Last sync: {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UTC
            </span>
          </div>
        </div>

        {/* Portfolio Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-sovereign-silver mb-12">
          {PORTFOLIO_SUMMARY.map((metric) => (
            <div key={metric.label} className="bg-white p-6">
              <div className="text-label uppercase text-slate mb-3">{metric.label}</div>
              <div className="text-metric font-mono font-bold text-navy tabular-nums">{metric.value}</div>
              <div className="text-xs text-status-active font-mono mt-2">{metric.delta}</div>
            </div>
          ))}
        </div>

        {/* Asset Table */}
        <div className="border border-sovereign-silver">
          <table className="w-full sovereign-table">
            <thead>
              <tr className="bg-sovereign-ivory">
                <th>Asset ID</th>
                <th>Project</th>
                <th className="hidden md:table-cell">Jurisdiction</th>
                <th className="hidden lg:table-cell">Biome</th>
                <th className="text-right">Hectares</th>
                <th className="text-right hidden md:table-cell">tCO₂e</th>
                <th className="text-right hidden lg:table-cell">Credits Pipeline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PORTFOLIO_ASSETS.map((asset) => (
                <tr
                  key={asset.id}
                  className="cursor-pointer hover:bg-sovereign-ivory transition-colors"
                  onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                >
                  <td className="font-mono text-xs text-slate">{asset.id}</td>
                  <td className="font-medium text-navy">{asset.name}</td>
                  <td className="hidden md:table-cell text-slate">{asset.jurisdiction}</td>
                  <td className="hidden lg:table-cell text-slate">{asset.biome}</td>
                  <td className="text-right font-mono tabular-nums">{asset.hectares.toLocaleString()}</td>
                  <td className="text-right font-mono tabular-nums hidden md:table-cell">{asset.carbonSequestered.toLocaleString()}</td>
                  <td className="text-right font-mono tabular-nums hidden lg:table-cell">{asset.creditsPipeline}</td>
                  <td>
                    <span className={`inline-block text-xs px-3 py-1 font-medium ${STATUS_STYLES[asset.status] || 'text-slate bg-gray-50'}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Expanded Asset Detail */}
          {selectedAsset && (
            <div className="border-t-2 border-navy p-8 bg-sovereign-ivory">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-label uppercase text-slate">{selectedAsset.id} — Detail View</span>
                  <h3 className="text-xl font-serif font-bold text-navy mt-1">{selectedAsset.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-slate hover:text-navy transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Ecological Data */}
                <div>
                  <h4 className="text-label uppercase text-slate mb-4 pb-2 border-b-2 border-navy">Ecological</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Biome</span>
                      <span className="text-charcoal">{selectedAsset.biome}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Hectares</span>
                      <span className="font-mono tabular-nums">{selectedAsset.hectares.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Biodiversity Score</span>
                      <span className="font-mono tabular-nums font-semibold">{selectedAsset.biodiversityScore}/10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Carbon Sequestered</span>
                      <span className="font-mono tabular-nums">{selectedAsset.carbonSequestered.toLocaleString()} tCO2e</span>
                    </div>
                  </div>
                </div>

                {/* Financial Data */}
                <div>
                  <h4 className="text-label uppercase text-slate mb-4 pb-2 border-b-2 border-navy">Financial</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Credits Pipeline</span>
                      <span className="font-mono tabular-nums font-semibold">{selectedAsset.creditsPipeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Frameworks</span>
                      <span className="text-charcoal text-right">{selectedAsset.complianceFrameworks.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div>
                  <h4 className="text-label uppercase text-slate mb-4 pb-2 border-b-2 border-navy">Verification</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Stamp Status</span>
                      <span className="text-charcoal">{selectedAsset.verificationStatus}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Jurisdiction</span>
                      <span className="text-charcoal">{selectedAsset.jurisdiction}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Last Updated</span>
                      <span className="font-mono text-xs">{selectedAsset.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate">
          <span>Data refreshed in real-time via ESW Ontology. All values auditable.</span>
          <span className="font-mono">ESW Platform v2.0</span>
        </div>
      </div>
    </section>
  )
}

export default ClientDashboard
