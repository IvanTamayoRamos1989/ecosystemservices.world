import React from 'react'
import useReveal from '../hooks/useReveal'

const stats = [
  { value: 'EIA', label: 'Environmental Impact Assessment' },
  { value: 'NbS', label: 'Nature-based Solutions' },
  { value: 'TNFD', label: 'Disclosure & Compliance' },
  { value: 'Credits', label: 'Carbon & Biodiversity' },
]

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="py-24 md:py-32">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-dark text-sm tracking-wider uppercase">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-6">
              The global authority on ecosystem services
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              ESW is the global authority on ecosystem services for large-scale
              projects. We operate across jurisdictions and biomes — from EU markets
              to emerging economies, tropical forests to arid landscapes — partnering
              with developers, governments, financial institutions, and sovereigns.
            </p>
            <p className="text-slate leading-relaxed">
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
                className="p-6 rounded-sm border border-gray-200 bg-white hover:border-accent transition-colors"
              >
                <div className="text-3xl font-bold text-dark font-serif mb-1">{stat.value}</div>
                <div className="text-sm text-slate">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
