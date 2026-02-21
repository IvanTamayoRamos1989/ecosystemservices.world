import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

const studies = [
  {
    sector: 'Urban NbS + Climate Adaptation',
    title: 'Corredores Verdes & Hubs de Movilidad Estratégica',
    region: 'Culiacán, Sinaloa, Mexico',
    scope: 'Systemic intervention across 4 components: massive native arborisation (15,000–25,000 trees), 8–12 automated parking hubs freeing 9.5 ha of urban land, green stormwater infrastructure (+40–60% absorption), and active mobility network — aligned with Plan Avanza, NOM-004-SEDATU-2023, and C40 CFF eligibility.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format',
    imageAlt: 'Urban green corridor with native tree planting',
    metrics: [
      { label: 'Total investment', value: '$35–50M' },
      { label: 'Trees planted', value: '15–25K' },
      { label: 'Land liberated', value: '9.5 ha' },
      { label: 'UHI reduction', value: '–3 to 5°C' },
      { label: 'Flood absorption', value: '+40–60%' },
      { label: 'CO₂ captured', value: '330–550 t/yr' },
    ],
    tags: ['C40 CFF', 'CAF', 'GCF', 'Banobras', 'NbS', 'Blended Finance', 'NOM-004-SEDATU'],
    featured: true,
  },
  {
    sector: 'Renewable Energy',
    title: 'Solar Farm Biodiversity Integration',
    region: 'Southern Europe',
    scope: 'Agrivoltaic design, EIA, biodiversity credit structuring',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80&auto=format',
    imageAlt: 'Solar panels integrated with natural meadow landscape',
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
    image: 'https://images.unsplash.com/photo-1559827291-bac3687ed5a0?w=800&q=80&auto=format',
    imageAlt: 'Aerial view of mangrove coastline restoration',
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
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80&auto=format',
    imageAlt: 'European forest ecosystem biodiversity assessment',
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
          <span className="text-navy text-sm tracking-wider uppercase">Case Studies</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-4">
            Representative engagements
          </h2>
          <p className="text-slate">
            Selected project profiles demonstrating ESW&apos;s integrated approach across
            sectors, geographies, and regulatory frameworks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study) => (
            <div
              key={study.title}
              className={`group rounded-sm border bg-white hover:border-navy transition-all duration-300 flex flex-col overflow-hidden ${
                study.featured
                  ? 'border-navy md:col-span-2'
                  : 'border-gray-200'
              }`}
            >
              {/* Infrastructure Image */}
              {study.image && (
                <div className={`relative overflow-hidden ${study.featured ? 'h-48 md:h-64' : 'h-40'}`}>
                  <img
                    src={study.image}
                    alt={study.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] tracking-wider uppercase px-2 py-1 bg-white/90 text-navy font-medium">
                      {study.region}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs tracking-wider uppercase text-navy">{study.sector}</span>
                <span className="text-slate text-xs">|</span>
                <span className="text-xs text-slate">{study.region}</span>
                {study.featured && (
                  <span className="ml-auto text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm border border-navy text-navy">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-navy transition-colors duration-300">
                {study.title}
              </h3>

              <p className="text-sm text-slate leading-relaxed mb-6">
                {study.scope}
              </p>

              {study.featured && (
                <div className="mb-6">
                  <button
                    onClick={() => setExpanded(expanded === study.title ? null : study.title)}
                    className="text-xs text-navy hover:text-navy/80 transition-colors tracking-wider uppercase"
                  >
                    {expanded === study.title ? '— Collapse details' : '+ View project details'}
                  </button>
                  {expanded === study.title && (
                    <div className="mt-4 p-6 rounded-sm border border-gray-200 bg-cultured space-y-5">
                      {/* Crisis Diagnostic */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">Diagnostic: Why Culiacán</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          {[
                            { label: 'Peak temp.', value: '42.5°C' },
                            { label: 'Forest loss', value: '–144 km²' },
                            { label: 'Green space/hab', value: '2.19 m²' },
                            { label: 'Vehicle fleet', value: '641,253' },
                          ].map((item) => (
                            <div key={item.label} className="text-center">
                              <div className="text-navy font-semibold text-sm font-mono">{item.value}</div>
                              <div className="text-[10px] text-slate uppercase tracking-wider mt-1">{item.label}</div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate">
                          ONU-Habitat standard: 15 m²/hab. Culiacán deficit: 85%. 92 parking lots (95,200 m²) identified as transformation catalyst.
                        </p>
                      </div>

                      {/* 4 Components */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">4-Component Intervention</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { comp: '1. Arborisation & Sidewalks', budget: '$12–18M', detail: '15–25K native trees, 4m+ sidewalks (NOM-004-SEDATU)' },
                            { comp: '2. Smart Vertical Parking', budget: '$15–20M', detail: '8–12 structures, 2,400–4,000 spaces, ground-floor retail' },
                            { comp: '3. Green Stormwater Infra', budget: '$4–6M', detail: 'Bioretention, permeable paving, +40–60% absorption' },
                            { comp: '4. Active Mobility Network', budget: '$4–6M', detail: 'Protected bike lanes, pedestrian streets, BRT integration' },
                          ].map((item) => (
                            <div key={item.comp} className="p-3 border border-gray-200 bg-white">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-semibold text-navy">{item.comp}</span>
                                <span className="text-xs font-mono text-navy">{item.budget}</span>
                              </div>
                              <p className="text-[10px] text-slate">{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Blended Finance Structure */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">Blended Finance Structure</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { layer: 'C40 CFF', amount: '$1–2M', type: 'Grant / TA' },
                            { layer: 'CAF', amount: '$10–15M', type: 'Concessional' },
                            { layer: 'GCF', amount: '$5–8M', type: 'Grant + Credit' },
                            { layer: 'Banobras', amount: '$5–8M', type: 'Municipal Credit' },
                            { layer: 'SEDATU/FONADIN', amount: '$3–5M', type: 'Federal Subsidy' },
                            { layer: 'Gob. Sinaloa', amount: '$3–5M', type: 'Co-finance' },
                            { layer: 'Municipio', amount: '$2–3M', type: 'Land + Permits' },
                            { layer: 'Value Capture', amount: '$2–4M', type: 'Recurring' },
                          ].map((item) => (
                            <div key={item.layer} className="text-center">
                              <div className="text-navy font-semibold text-sm font-mono">{item.amount}</div>
                              <div className="text-[10px] text-slate uppercase tracking-wider mt-1">{item.layer}</div>
                              <div className="text-[9px] text-slate/70">{item.type}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ecosystem Services */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">Ecosystem Services Portfolio</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            { service: 'Thermal regulation', value: '$2–4M/yr savings' },
                            { service: 'Carbon capture', value: '330–550 tCO₂/yr' },
                            { service: 'Flood control', value: '$5–10M damages avoided' },
                            { service: 'Property uplift', value: '+30% value' },
                          ].map((item) => (
                            <div key={item.service} className="p-2 border border-gray-200 bg-white text-center">
                              <div className="text-[10px] text-slate uppercase tracking-wider">{item.service}</div>
                              <div className="text-xs font-semibold text-navy mt-1">{item.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Native Species */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">Native Species Palette</h4>
                        <p className="text-xs text-slate">
                          <span className="text-charcoal font-medium">Tabebuia rosea</span> (Amapa) —
                          <span className="text-charcoal font-medium"> Pithecellobium dulce</span> (Guamuchil) —
                          <span className="text-charcoal font-medium"> Prosopis</span> spp. (Mezquite) —
                          <span className="text-charcoal font-medium"> Enterolobium cyclocarpum</span> (Huanacaxtle, 20–25m canopy) —
                          <span className="text-charcoal font-medium"> Ceiba pentandra</span> (Ceiba) —
                          <span className="text-charcoal font-medium"> Delonix regia</span> (Tabachín) —
                          <span className="text-charcoal font-medium"> Salix</span> spp. (Sauce, flood zones) —
                          <span className="text-charcoal font-medium"> Parkinsonia aculeata</span> (Palo Verde).
                          All &gt;42°C tolerant, drought-resistant, high canopy, selected per IUCN NbS Criterion 3.
                        </p>
                      </div>

                      {/* Regulatory Alignment */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">Regulatory Alignment</h4>
                        <p className="text-xs text-slate">
                          NOM-004-SEDATU-2023 (obligatory June 2024) · Plan Avanza 2024 (Culiacán mobility master plan) ·
                          Plan Conecta Sinaloa 2045 · ENAMOV 2023–2042 · PECCSIN (Sinaloa Climate Plan) ·
                          Ley Estatal de Cambio Climático · IUCN Global Standard for NbS ·
                          IDB ESPF (10 Performance Standards) · Principios de Bonos Verdes MX (ICMA-aligned) ·
                          ODS 11, 13, 3 (Agenda 2030)
                        </p>
                      </div>

                      {/* MRV */}
                      <div>
                        <h4 className="text-sm font-semibold text-navy mb-2">MRV System</h4>
                        <p className="text-xs text-slate">
                          Google Earth Engine (LST + NDVI quarterly) · i-Tree Eco (annual carbon) ·
                          Flow sensors + pluviometry (per event) · Redspira PM2.5 (continuous) ·
                          SESESP + Mapasín road safety (monthly) · Origin-destination surveys (annual)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className={`grid gap-3 mb-6 mt-auto ${study.featured ? 'grid-cols-3 md:grid-cols-6' : 'grid-cols-3'}`}>
                {study.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-navy font-semibold text-sm">{m.value}</div>
                    <div className="text-[10px] text-slate uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-sm border border-gray-200 text-slate"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
