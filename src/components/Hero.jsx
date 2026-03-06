import React from 'react'


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
            Turn Environmental Liabilities<br />Into Bankable Assets.
          </h1>

          <p className="text-lg text-slate leading-relaxed mb-6 max-w-2xl">
            ESW structures Nature-Based Solutions for governments, developers, and infrastructure
            investors — combining science, sustainable finance, and regulatory expertise to deliver
            bankable ecological assets across any jurisdiction.
          </p>
          <p className="text-base text-slate leading-relaxed mb-10 max-w-2xl">
            From environmental baselines to credit issuance, from green bonds to TNFD compliance —
            we manage the full lifecycle of nature-based infrastructure finance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-esw-ai'))}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-navy text-white font-medium text-sm tracking-wider uppercase hover:bg-navy-800 transition-colors gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Launch ESW.AI
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-navy text-navy font-medium text-sm tracking-wider uppercase hover:bg-navy hover:text-white transition-colors"
            >
              Explore Services
            </a>
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
