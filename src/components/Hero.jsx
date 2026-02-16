import React from 'react'

const liveMetrics = [
  { label: 'Assets Under Management', value: '85,200', unit: 'Hectares' },
  { label: 'Green Finance Structured', value: '$200M', unit: 'USD' },
  { label: 'Active Jurisdictions', value: '12', unit: 'Countries' },
  { label: 'Carbon Sequestered', value: '142,000', unit: 'tCO2e' },
]

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-28">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Dateline */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-sovereign-silver" />
          <span className="text-label uppercase text-slate">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <div className="h-px flex-1 bg-sovereign-silver" />
        </div>

        {/* Headline Block */}
        <div className="max-w-4xl">
          <div className="sovereign-rule pt-6 mb-8">
            <span className="text-label uppercase text-slate tracking-widest">The Operating System for Nature</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-8">
            Every Asset Has a<br />Nature Balance Sheet.
          </h1>

          <p className="text-lg text-slate leading-relaxed mb-10 max-w-2xl">
            ESW is the global platform where ecological liabilities become auditable,
            tradeable, bankable assets. We manage the full lifecycle — from baseline
            science to credit issuance to regulatory compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-navy text-white font-medium text-sm tracking-wider uppercase hover:bg-navy-800 transition-colors"
            >
              View Platform
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
      <div className="mt-auto pb-8 flex flex-col items-center gap-2 text-slate animate-scroll-bounce">
        <span className="text-label uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-sovereign-silver" />
      </div>
    </section>
  )
}

export default Hero
