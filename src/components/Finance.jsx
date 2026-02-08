import React from 'react'

const instruments = [
  {
    title: 'Green & Sustainability-Linked Bonds',
    description: 'Structuring debt instruments that tie financial returns to verified environmental outcomes and ecosystem restoration metrics.',
  },
  {
    title: 'Biodiversity Credits',
    description: 'Designing and validating biodiversity credit programs that channel capital toward measurable habitat and species conservation.',
  },
  {
    title: 'Carbon Instruments',
    description: 'Developing high-integrity carbon offset and inset strategies connected to nature-based solutions and verified removals.',
  },
  {
    title: 'Blended Finance',
    description: 'Combining public, private, and philanthropic capital to de-risk regenerative projects and unlock investment at scale.',
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
              Sustainable finance is the engine that turns regenerative strategies
              into reality. We design financial instruments and structures that
              align capital flows with ecosystem restoration — creating value for
              investors, communities, and the natural world.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our team bridges the gap between environmental science and capital
              markets, ensuring that financial mechanisms are grounded in ecological
              integrity and deliver measurable impact.
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
