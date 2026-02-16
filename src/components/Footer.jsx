import React from 'react'

const footerLinks = {
  Platform: [
    { label: 'Assets Dashboard', href: '#dashboard' },
    { label: 'ROI Calculator', href: '#roi-calculator' },
    { label: 'Verification Portal', href: '#vendor-portal' },
    { label: 'Sector Intel', href: '#intel' },
  ],
  Advisory: [
    { label: 'Origination & Design', href: '#services' },
    { label: 'Capital Stack Optimization', href: '#finance' },
    { label: 'Liability Management', href: '#approach' },
    { label: 'Case Studies', href: '#case-studies' },
  ],
  Company: [
    { label: 'About ESW', href: '#about' },
    { label: 'Methodology', href: '#approach' },
    { label: 'Global Presence', href: '#global' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Contact', href: '#contact' },
  ],
}

function Footer() {
  return (
    <footer className="border-t-2 border-navy bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif font-bold text-2xl text-navy tracking-tight">ESW</span>
            </div>
            <p className="text-sm text-slate leading-relaxed mb-2">
              The Operating System for Nature.
            </p>
            <p className="text-xs text-slate leading-relaxed mb-6">
              Digital Prime Contractor for nature-based infrastructure finance.
              AI-driven analysis. Human-stamped verification. Bankable outcomes.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/ecosystemservicesworld"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate hover:text-navy transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:info@ecosystemservices.world"
                className="text-slate hover:text-navy transition-colors"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-label uppercase text-slate tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate hover:text-navy transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sovereign-silver py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate">
            &copy; {new Date().getFullYear()} Ecosystem Services World. All rights reserved.
          </p>
          <p className="text-xs text-slate font-mono">
            Regenerative Capital.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
