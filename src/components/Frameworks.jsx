import React from 'react'
import useReveal from '../hooks/useReveal'

const frameworks = [
  {
    name: 'CSRD',
    full: 'Corporate Sustainability Reporting Directive',
    category: 'Disclosure',
  },
  {
    name: 'EU Taxonomy',
    full: 'EU Taxonomy for Sustainable Activities',
    category: 'Classification',
  },
  {
    name: 'TNFD',
    full: 'Taskforce on Nature-related Financial Disclosures',
    category: 'Disclosure',
  },
  {
    name: 'ISSB',
    full: 'International Sustainability Standards Board',
    category: 'Standards',
  },
  {
    name: 'Verra VCS',
    full: 'Verified Carbon Standard',
    category: 'Crediting',
  },
  {
    name: 'Gold Standard',
    full: 'Gold Standard for the Global Goals',
    category: 'Crediting',
  },
  {
    name: 'Plan Vivo',
    full: 'Community-focused Carbon Standard',
    category: 'Crediting',
  },
  {
    name: 'ICMA GBP',
    full: 'Green Bond Principles',
    category: 'Finance',
  },
  {
    name: 'EU NRL',
    full: 'EU Nature Restoration Law',
    category: 'Regulation',
  },
  {
    name: 'BNG',
    full: 'Biodiversity Net Gain',
    category: 'Metric',
  },
]

function Frameworks() {
  const [ref, visible] = useReveal(0.15)

  return (
    <section className="py-20 md:py-28 bg-cultured">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-dark text-sm tracking-wider uppercase">
            Standards & Frameworks
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-4">
            Operating across every major framework
          </h2>
          <p className="text-slate">
            We structure work under the disclosure, crediting, and regulatory standards
            that govern international ecosystem services markets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {frameworks.map((fw, i) => (
            <div
              key={fw.name}
              className="group relative p-5 rounded-sm border border-gray-200 bg-white hover:border-dark transition-all duration-300 text-center"
            >
              <div className="text-dark font-semibold text-sm mb-1">{fw.name}</div>
              <div className="text-[10px] text-slate uppercase tracking-wider">
                {fw.category}
              </div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark border border-gray-300 rounded-sm text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {fw.full}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Frameworks
