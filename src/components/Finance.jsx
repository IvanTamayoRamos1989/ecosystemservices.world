import React from 'react'
import useReveal from '../hooks/useReveal'

const instruments = [
  {
    title: 'Climate Finance Facilities',
    description: 'Technical assistance grants for bankable project structuring. ESW prepares feasibility studies, MRV frameworks, and financial models to C40 CFF, GEF, and bilateral climate fund eligibility standards.',
    tag: 'Grant / TA',
  },
  {
    title: 'Development Finance Institutions',
    description: 'Long-term concessional debt from multilateral development banks (CAF, AfDB, ADB, IDB, EIB) for green infrastructure. We structure proposals to DFI investment criteria and environmental safeguards.',
    tag: 'Concessional',
  },
  {
    title: 'Green Climate Fund (GCF)',
    description: 'Adaptation-focused grants and credit for NbS. ESW structures proposals against GCF investment criteria — climate rationale, paradigm shift potential, and measurable co-benefits.',
    tag: 'Grant + Credit',
  },
  {
    title: 'Carbon & Biodiversity Credits',
    description: 'Revenue from verified carbon credits (Verra VCS, Gold Standard, Plan Vivo) and emerging biodiversity credit markets. Full MRV design, baseline-to-issuance advisory.',
    tag: 'Credits',
  },
  {
    title: 'Green & Sustainability-Linked Bonds',
    description: 'Use-of-proceeds bond structuring aligned with ICMA Green Bond Principles and EU Green Bond Standard. Tied to verified ecological outcomes — carbon, biodiversity, water.',
    tag: 'Debt',
  },
  {
    title: 'Blended Finance & Value Capture',
    description: 'Layered capital stacks combining concessional, commercial, and public sources. Land value capture, ecosystem service payments, and property uplift from greened infrastructure.',
    tag: 'Blended',
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
                Sustainable finance instruments, structured for bankability.
              </h2>
            </div>
            <div>
              <p className="text-slate leading-relaxed mb-4">
                ESW structures multi-source capital stacks combining international climate
                finance, development bank concessional lending, carbon and biodiversity credit
                revenues, green bonds, and local value capture mechanisms — each layer
                optimized for institutional due diligence and financial close.
              </p>
              <p className="text-slate leading-relaxed">
                We match projects with the right instruments across geographies — from
                GCF grants in emerging markets to EU Green Bonds in CSRD-regulated environments.
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
          <span>Aligned with ICMA GBP · EU Green Bond Standard · IDB ESPF · GCF Investment Criteria · Verra VCS · Gold Standard.</span>
          <span className="font-mono">ESW Capital Advisory</span>
        </div>
      </div>
    </section>
  )
}

export default Finance
