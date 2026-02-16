import React from 'react'
import useReveal from '../hooks/useReveal'

const instruments = [
  {
    title: 'Capital Stack Optimization',
    description: 'We match infrastructure projects with the right financial instruments — concessional debt, green bonds, blended finance — to reduce weighted average cost of capital by integrating audit-ready nature assets.',
    tag: 'Core',
  },
  {
    title: 'Carbon Credits (Verra / Gold Standard)',
    description: 'Methodology selection, baseline setting, additionality assessment, and credit forecasting for nature-based removal and avoidance projects. Bankable-grade documentation for institutional buyers.',
    tag: 'Credits',
  },
  {
    title: 'Green & Sustainability-Linked Bonds',
    description: 'Use-of-proceeds frameworks, ICMA Green Bond Principles alignment, and reporting structures for debt instruments tied to verified ecological outcomes.',
    tag: 'Debt',
  },
  {
    title: 'Blended Finance & DFI Structuring',
    description: 'Combining public, private, and philanthropic capital — C40 CFF, NADBank, IDB, sovereign funds — to de-risk regenerative projects and unlock investment at scale.',
    tag: 'Grants',
  },
  {
    title: 'Biodiversity Credits',
    description: 'Biodiversity Net Gain unit calculation, credit pricing, and market positioning — aligned with emerging EU biodiversity credit guidance and national frameworks.',
    tag: 'Credits',
  },
  {
    title: 'Resilience & Catastrophe Bonds',
    description: 'Structuring insurance-linked instruments that monetize the flood mitigation, coastal protection, and climate resilience value of nature-based infrastructure.',
    tag: 'Risk',
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
                Sustainability is not a cost center. It's a capital advantage.
              </h2>
            </div>
            <div>
              <p className="text-slate leading-relaxed mb-4">
                Traditional infrastructure financing ignores the balance sheet value of
                natural capital. ESW engineers that value into the capital stack — structuring
                instruments that align investment flows with verified ecological performance
                under EU Taxonomy, ICMA principles, and international crediting standards.
              </p>
              <p className="text-slate leading-relaxed">
                Every financial model is built for institutional due diligence,
                regulatory scrutiny, and the final human-stamped opinion required at close.
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
          <span>All instruments structured for CSRD / EU Taxonomy / TNFD compliance.</span>
          <span className="font-mono">ESW Capital Advisory</span>
        </div>
      </div>
    </section>
  )
}

export default Finance
