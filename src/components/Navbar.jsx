import React, { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'Finance', href: '#finance' },
  { label: 'Contact', href: '#contact' },
]

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-lg font-semibold tracking-wide">
            <span className="text-accent">EWS</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-5 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-dark transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-md border-t border-white/5 px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-gray-400 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 text-sm text-center px-5 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-dark transition-all"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
