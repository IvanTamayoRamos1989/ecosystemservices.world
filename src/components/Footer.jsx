import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            <span className="text-sm font-semibold text-accent">ESW</span>
            <span className="text-sm text-gray-600">Ecosystem Services World</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#approach" className="hover:text-accent transition-colors">Approach</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-accent transition-colors">Privacy</a>
          </div>

          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ESW. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
