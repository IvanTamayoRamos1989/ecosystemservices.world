import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

const studies = [
  {
    sector: 'Urban NbS + Mobility',
    title: 'Green Corridors & Strategic Mobility Hubs',
    region: 'Culiacán, Sinaloa, Mexico',
    scope: 'C40 CFF bankable project: street reclamation, automated parking hubs, native tree corridors, blended finance structuring (IDB + municipal green bond)',
    metrics: [
      { label: 'Project volume', value: '$35–50M' },
      { label: 'Corridors', value: '15–25 km' },
      { label: 'Facility', value: 'C40 CFF' },
    ],
    tags: ['NbS', 'Blended Finance', 'IUCN Standard', 'Adaptation'],
    featured: true,
  },
  {
    sector: 'Renewable Energy',
    title: 'Solar Farm Biodiversity Integration',
    region: 'Southern Europe',
    scope: 'Agrivoltaic design, EIA, biodiversity credit structuring',
    metrics: [
      { label: 'Hectares assessed', value: '2,400' },
      { label: 'BNG uplift', value: '+34%' },
      { label: 'Credit pipeline', value: 'Active' },
    ],
    tags: ['EIA', 'NbS', 'Biodiversity Credits'],
  },
  {
    sector: 'Infrastructure',
    title: 'Coastal Resilience Programme',
    region: 'West Africa',
    scope: 'Mangrove restoration, carbon credit feasibility, TNFD reporting',
    metrics: [
      { label: 'Coastline covered', value: '38 km' },
      { label: 'Carbon offset potential', value: '120k tCO2e/yr' },
      { label: 'Standard', value: 'Verra VCS' },
    ],
    tags: ['Carbon Credits', 'NbS', 'TNFD'],
  },
  {
    sector: 'Real Estate',
    title: 'Urban Development Ecological Assessment',
    region: 'Central Europe',
    scope: 'Multi-jurisdictional EIA, mitigation hierarchy, EU Taxonomy alignment',
    metrics: [
      { label: 'Site area', value: '180 ha' },
      { label: 'Species assessed', value: '340+' },
      { label: 'Compliance', value: 'CSRD / TNFD' },
    ],
    tags: ['EIA', 'EU Taxonomy', 'CSRD'],
  },
]

function CaseStudies() {
  const [ref, visible] = useReveal()
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm tracking-wider uppercase">Case Studies</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Representative engagements
          </h2>
          <p className="text-gray-400">
            Selected project profiles demonstrating ESW&apos;s integrated approach across
            sectors, geographies, and regulatory frameworks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <div
              key={study.title}
              className={`group p-8 rounded-lg border bg-white/[0.02] hover:border-accent/30 transition-all duration-300 flex flex-col ${
                study.featured
                  ? 'border-accent/20 md:col-span-2'
                  : 'border-white/5'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs tracking-wider uppercase text-accent">{study.sector}</span>
                <span className="text-gray-600 text-xs">|</span>
                <span className="text-xs text-gray-500">{study.region}</span>
                {study.featured && (
                  <span className="ml-auto text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full border border-accent/30 text-accent">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                {study.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {study.scope}
              </p>

              {study.featured && (
                <div className="mb-6">
                  <button
                    onClick={() => setExpanded(expanded === study.title ? null : study.title)}
                    className="text-xs text-accent hover:text-accent/80 transition-colors tracking-wider uppercase"
                  >
                    {expanded === study.title ? '— Collapse details' : '+ View project details'}
                  </button>
                  {expanded === study.title && (
                    <div className="mt-4 p-6 rounded border border-white/5 bg-white/[0.01] space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">Blended Finance Structure</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { layer: 'C40 CFF TA', amount: '~$1M' },
                            { layer: 'IDB Loan', amount: '$15–25M' },
                            { layer: 'Green Bond', amount: '$10–15M' },
                            { layer: 'Municipal', amount: '$2–5M' },
                          ].map((item) => (
                            <div key={item.layer} className="text-center">
                              <div className="text-accent font-semibold text-sm">{item.amount}</div>
                              <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-1">{item.layer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">Native Species Palette</h4>
                        <p className="text-xs text-gray-400">
                          <span className="text-gray-300">Tabebuia rosea</span> (Amapa) —
                          <span className="text-gray-300"> Guazuma ulmifolia</span> (Guásima) —
                          <span className="text-gray-300"> Prosopis</span> spp. (Mezquite).
                          Selected per IUCN NbS Criterion 3 for canopy shade, transpirational cooling, and non-aggressive root systems.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">Regulatory Alignment</h4>
                        <p className="text-xs text-gray-400">
                          PECCSIN (Sinaloa State Climate Plan) · Ley Estatal de Cambio Climático ·
                          NOM-060-SEMARNAT-1994 · IUCN Global Standard for NbS ·
                          IDB ESPF (10 Performance Standards) · Principios de Bonos Verdes MX (ICMA-aligned)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className={`grid gap-3 mb-6 mt-auto ${study.featured ? 'grid-cols-3 md:grid-cols-3' : 'grid-cols-3'}`}>
                {study.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-accent font-semibold text-sm">{m.value}</div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase px-2 py-1 rounded border border-white/10 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
