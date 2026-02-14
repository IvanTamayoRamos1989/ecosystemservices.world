import React, { Suspense, lazy } from 'react'

const EarthScene = lazy(() => import('./EarthScene'))

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border border-accent/20 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-accent/40 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Earth background */}
      <div className="absolute inset-0 opacity-60">
        <Suspense fallback={<LoadingFallback />}>
          <EarthScene />
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs tracking-wider uppercase mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Global Ecosystem Services Consultancy
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Turning environmental liabilities into
            <span className="text-accent"> ecological assets</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
            We advise developers, financial institutions, and governments on
            the environmental dimensions of large-scale projects — integrating
            ecological science, regenerative design, and sustainable finance
            into a single, rigorous practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-dark font-medium rounded hover:bg-accent/90 transition-colors"
            >
              Our Services
            </a>
            <a
              href="#approach"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white rounded hover:border-accent/50 hover:text-accent transition-colors"
            >
              Our Methodology
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-scroll-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  )
}

export default Hero
