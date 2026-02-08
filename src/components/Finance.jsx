import React from 'react'

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
  return (
    <section id="finance" className="py-24 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: description */}
          <div>
            <span className="text-accent text-sm tracking-wider uppercase">Sustainable Finance</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Finance as a catalyst for regeneration
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Capital mobilization is the mechanism that converts regenerative
              strategy into executed outcomes. We design and structure financial
              instruments that align investment flows with verified ecological
              performance.
            </p>
            <p className="text-gray-400 leading-relaxed">
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
                className="p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-accent text-xs font-mono mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
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
