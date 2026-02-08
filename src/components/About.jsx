import React from 'react'

const stats = [
  { value: '150+', label: 'Projects Assessed' },
  { value: '40+', label: 'Countries Reached' },
  { value: '98%', label: 'Client Retention' },
  { value: '$2B+', label: 'Sustainable Finance Mobilized' },
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
              Bridging ecology and economy for a regenerative future
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              EWS is a specialized consultancy that sits at the intersection of
              environmental science and sustainable finance. We partner with
              developers, governments, and financial institutions to ensure
              large-scale projects deliver positive environmental outcomes.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our team combines deep expertise in ecosystem assessment with
              innovative financial structuring, turning environmental
              responsibility into tangible value. We don't just measure
              impact — we design pathways to regeneration.
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
