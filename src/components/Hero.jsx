import React from 'react'

function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 bg-gray-50 text-slate text-xs tracking-wider uppercase mb-8">
            Global Ecosystem Services Consultancy
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
            Turning environmental liabilities into
            <span className="text-dark"> ecological assets</span>
          </h1>

          <p className="text-lg text-slate leading-relaxed mb-10 max-w-2xl mx-auto">
            We advise developers, financial institutions, and governments on
            the environmental dimensions of large-scale projects — integrating
            ecological science, regenerative design, and sustainable finance
            into a single, rigorous practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-3 bg-dark text-white font-medium rounded-sm hover:bg-charcoal transition-colors"
            >
              Our Services
            </a>
            <a
              href="#approach"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-slate rounded-sm hover:border-dark hover:text-dark transition-colors"
            >
              Our Methodology
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-scroll-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  )
}

export default Hero
