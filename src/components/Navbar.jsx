import React, { useState } from 'react'

const navLinks = [
  { label: 'Platform', href: '#dashboard' },
  { label: 'Services', href: '#services' },
  { label: 'Methodology', href: '#approach' },
  { label: 'Finance', href: '#finance' },
  { label: 'Global', href: '#global' },
  { label: 'Intel', href: '#intel' },
]

const tickerData = [
  { label: 'CULIACÁN NBS', value: '$35–50M', delta: 'structuring' },
  { label: 'TREES PIPELINE', value: '25,000', delta: 'native spp.' },
  { label: 'UHI TARGET', value: '–3 to 5°C', delta: 'surface' },
  { label: 'LAND LIBERATED', value: '95,200 m²', delta: '92 lots' },
  { label: 'FLOOD ABSORB.', value: '+40–60%', delta: 'pluvial' },
  { label: 'CO₂ CAPTURE', value: '550 t/yr', delta: 'projected' },
]

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Ticker Bar */}
      <div className="bg-navy text-white overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-6 py-1.5">
              <span className="text-ticker text-sovereign-steel">{item.label}</span>
              <span className="text-ticker font-mono font-medium text-white">{item.value}</span>
              {item.delta && (
                <span className={`text-ticker font-mono ${
                  item.delta.startsWith('-') ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {item.delta}
                </span>
              )}
              <span className="text-navy-600 mx-2">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-sovereign-silver">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl font-bold text-navy leading-none tracking-wide">ESW</span>
              <span className="hidden sm:inline text-label uppercase text-slate tracking-widest ml-3">Ecosystem Services World</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label uppercase text-slate hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-5 bg-sovereign-silver" />
            <a
              href="#roi-calculator"
              className="text-label uppercase text-navy font-semibold hover:underline transition-all duration-200"
            >
              ROI Calculator
            </a>
            <a
              href="#contact"
              className="text-label uppercase px-5 py-2 bg-navy text-white hover:bg-navy-800 transition-all duration-200"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-slate hover:text-navy transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-sovereign-silver px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-label uppercase text-slate hover:text-navy transition-colors border-b border-sovereign-silver"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#roi-calculator"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-label uppercase text-navy font-semibold"
          >
            ROI Calculator
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-4 text-label uppercase text-center px-5 py-3 bg-navy text-white"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
