import React from 'react'
import useReveal from '../hooks/useReveal'

const instruments = [
  {
    title: 'C40 Cities Finance Facility (CFF)',
    description: 'Technical assistance grants for bankable project structuring. ESW prepares feasibility studies, MRV frameworks, and financial models to CFF eligibility standards. Culiacán: ~$1–2M TA grant.',
    tag: 'Grant / TA',
  },
  {
    title: 'CAF — Concessional Infrastructure',
    description: 'Long-term concessional debt from CAF – Banco de Desarrollo de América Latina for green urban infrastructure. Culiacán target: $10–15M for arborisation corridors and vertical parking hubs.',
    tag: 'Concessional',
  },
  {
    title: 'Green Climate Fund (GCF)',
    description: 'Adaptation-focused grants and credit for NbS. ESW structures proposals against GCF investment criteria — climate rationale, paradigm shift potential, co-benefits. Target: $5–8M.',
    tag: 'Grant + Credit',
  },
  {
    title: 'Banobras & SEDATU / FONADIN',
    description: 'Mexican federal financing for municipal infrastructure and mobility. Aligned with ENAMOV 2023–2042 and NOM-004-SEDATU-2023. Target: $8–13M in public co-financing.',
    tag: 'Federal MX',
  },
  {
    title: 'Municipal Green Bonds',
    description: 'Use-of-proceeds bond structuring aligned with ICMA Green Bond Principles and Principios de Bonos Verdes MX. Tied to verified MRV outcomes — LST, NDVI, carbon, flood metrics.',
    tag: 'Debt',
  },
  {
    title: 'Value Capture & Revenue',
    description: 'Parking meter revenue, land value capture from 95,200 m² liberated urban land, ground-floor commercial rents in vertical hubs, property tax uplift from greened corridors. $2–4M recurring.',
    tag: 'Revenue',
  },
]

function Finance() {
  const [ref, visible] = useReveal()

  return (
    <section id="finance" className="py-20 md:py-28 bg-sovereign-ivory">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="sovereign-rule pt-6 mb-4">
            <span className="text-label uppercase text-slate tracking-widest">Sustainable Finance</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
                $35–50M blended finance, structured for Culiacán.
              </h2>
            </div>
            <div>
              <p className="text-slate leading-relaxed mb-4">
                The Corredores Verdes capital stack combines 8 funding sources —
                international climate finance (C40 CFF, CAF, GCF), federal Mexican instruments
                (Banobras, SEDATU/FONADIN), state/municipal co-financing, and local value capture
                mechanisms. Each layer is structured for bankability and institutional due diligence.
              </p>
              <p className="text-slate leading-relaxed">
                Distribution: Arborisation & sidewalks (30–35%), vertical parking (35–40%),
                green stormwater (10–12%), active mobility (10–12%), design/MRV (5–6%).
              </p>
            </div>
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-sovereign-silver">
          {instruments.map((item, i) => (
            <div
              key={item.title}
              className="bg-white p-8 hover:bg-sovereign-ivory transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-label uppercase text-navy font-medium tracking-widest">{item.tag}</span>
              </div>
              <h3 className="font-semibold text-navy mb-3">{item.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 pt-4 border-t border-sovereign-silver flex items-center justify-between text-xs text-slate">
          <span>Aligned with NOM-004-SEDATU-2023 · Plan Avanza 2024 · ENAMOV 2023–2042 · ICMA GBP · IDB ESPF.</span>
          <span className="font-mono">ESW Capital Advisory</span>
        </div>
      </div>
    </section>
  )
}

export default Finance
