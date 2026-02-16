import React from 'react'
import useReveal from '../hooks/useReveal'

const instruments = [
  {
    title: 'Carbon Credits (Verra / Gold Standard)',
    description: 'Methodology selection, baseline setting, additionality assessment, and credit forecasting for nature-based removal and avoidance projects.',
  },
  {
    title: 'Biodiversity Credits',
    description: 'Biodiversity Net Gain unit calculation, credit pricing, and market positioning — aligned with emerging EU biodiversity credit guidance.',
  },
  {
    title: 'Green & Sustainability-Linked Bonds',
    description: 'Use-of-proceeds frameworks, ICMA Green Bond Principles alignment, and reporting structures for debt instruments tied to ecological outcomes.',
  },
  {
    title: 'Blended Finance',
    description: 'Combining public, private, and philanthropic capital — DFIs, sovereign funds, impact investors — to de-risk regenerative projects and unlock investment at scale globally.',
  },
]

function Finance() {
  const [ref, visible] = useReveal()

  return (
    <section id="finance" className="py-24 md:py-32 bg-cultured">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: description */}
          <div>
            <span className="text-accent text-sm tracking-wider uppercase">Sustainable Finance</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-6">
              Finance as a catalyst for regeneration
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              Capital mobilization is the mechanism that converts regenerative
              strategy into executed outcomes. We design and structure financial
              instruments that align investment flows with verified ecological
              performance.
            </p>
            <p className="text-slate leading-relaxed">
              Our financial advisory practice operates at the intersection of
              environmental science and capital markets — structuring instruments
              under EU Taxonomy, ICMA principles, and internationally recognized
              crediting standards. Every model is built for institutional due
              diligence and regulatory scrutiny.
            </p>
          </div>

          {/* Right: instruments */}
          <div className="space-y-4">
            {instruments.map((item, i) => (
              <div
                key={item.title}
                className="p-6 rounded-sm border border-gray-200 bg-white hover:border-accent transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-accent text-xs font-mono mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Finance
