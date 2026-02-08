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
              Where ecology meets economy in the Mediterranean
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              ESW is a specialized consultancy operating at the intersection of
              environmental science and sustainable finance across Spain and
              Southern Europe. We partner with solar developers, infrastructure
              companies, governments, and impact investors to ensure large-scale
              projects deliver measurable ecological outcomes.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our team combines deep expertise in Mediterranean ecosystems,
              EU regulatory frameworks (CSRD, EU Taxonomy, TNFD), and
              innovative financial structuring — from biodiversity credits to
              green bonds. We don't just assess impact. We design the
              regeneration and finance it.
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
