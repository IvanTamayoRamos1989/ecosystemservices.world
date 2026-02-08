import React from 'react'

const stats = [
  { value: 'EIA', label: 'Environmental Impact Assessment' },
  { value: 'NbS', label: 'Nature-based Solutions' },
  { value: 'TNFD', label: 'Disclosure & Compliance' },
  { value: 'Credits', label: 'Carbon & Biodiversity' },
]

function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-accent text-sm tracking-wider uppercase">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              The global authority on ecosystem services
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              ESW is the global authority on ecosystem services for large-scale
              projects. We operate across jurisdictions and biomes — from EU markets
              to emerging economies, tropical forests to arid landscapes — partnering
              with developers, governments, financial institutions, and sovereigns.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our practice integrates ecological science, regenerative design,
              and financial engineering under a single mandate. We operate
              across every major disclosure and crediting framework — CSRD,
              EU Taxonomy, TNFD, ISSB, Verra, Gold Standard — adapting to
              local ecology, local regulation, and local capital markets.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/20 transition-colors"
              >
                <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
