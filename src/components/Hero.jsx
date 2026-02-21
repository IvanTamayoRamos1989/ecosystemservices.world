import React from 'react'

const liveMetrics = [
  { label: 'Flagship Project', value: '$35–50M', unit: 'Culiacán NbS' },
  { label: 'Trees Pipeline', value: '25,000', unit: 'native species' },
  { label: 'UHI Reduction Target', value: '–5°C', unit: 'surface temp.' },
  { label: 'Flood Absorption', value: '+60%', unit: 'pluvial capacity' },
]

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28">
      {/* B&W Infrastructure Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80&auto=format"
          alt="Aerial view of lush forest canopy"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Dateline */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-sovereign-silver/60" />
          <span className="text-label uppercase text-slate">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <div className="h-px flex-1 bg-sovereign-silver/60" />
        </div>

        {/* Headline Block */}
        <div className="max-w-4xl">
          <div className="sovereign-rule pt-6 mb-8">
            <span className="text-label uppercase text-slate tracking-widest">The Operating System for Nature</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-8">
            Turn Climate Liabilities<br />Into Bankable Assets.
          </h1>

          <p className="text-lg text-slate leading-relaxed mb-6 max-w-2xl">
            ESW structures Nature-Based Solutions for cities and infrastructure developers —
            combining C40 CFF, CAF, GCF, and DFI financing to deliver bankable climate
            adaptation projects. From arborisation to flood resilience to green bonds.
          </p>
          <p className="text-base text-slate leading-relaxed mb-10 max-w-2xl">
            Currently structuring the $35–50M Corredores Verdes project for Culiacán, Sinaloa —
            15,000–25,000 native trees, 9.5 hectares liberated, 4-component urban NbS system
            aligned with Plan Avanza and NOM-004-SEDATU-2023.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-navy text-white font-medium text-sm tracking-wider uppercase hover:bg-navy-800 transition-colors"
            >
              View Culiacán Project
            </a>
            <a
              href="#roi-calculator"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-navy text-navy font-medium text-sm tracking-wider uppercase hover:bg-navy hover:text-white transition-colors"
            >
              Calculate ROI
            </a>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="mt-20 pt-8 border-t-2 border-navy">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {liveMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-label uppercase text-slate mb-2">{metric.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-metric font-mono font-bold text-navy tabular-nums">{metric.value}</span>
                  <span className="text-sm text-slate">{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mt-auto pb-8 flex flex-col items-center gap-2 text-slate animate-scroll-bounce">
        <span className="text-label uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-sovereign-silver" />
      </div>
    </section>
  )
}

export default Hero
