import React from 'react'
import useReveal from '../hooks/useReveal'

const studies = [
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((study) => (
            <div
              key={study.title}
              className="group p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs tracking-wider uppercase text-accent">{study.sector}</span>
                <span className="text-gray-600 text-xs">|</span>
                <span className="text-xs text-gray-500">{study.region}</span>
              </div>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                {study.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {study.scope}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 mt-auto">
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
