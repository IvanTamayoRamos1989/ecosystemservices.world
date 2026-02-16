import React from 'react'
import useReveal from '../hooks/useReveal'

const regions = [
  {
    name: 'Europe',
    description: 'HQ operations. Deep integration with EU regulatory architecture — CSRD, EU Taxonomy, Nature Restoration Law, EuGB Standard.',
    markets: ['EU/EEA', 'UK', 'Switzerland'],
    status: 'Active',
  },
  {
    name: 'Sub-Saharan Africa',
    description: 'Coastal resilience, mangrove restoration, and carbon credit development across West and East African corridors.',
    markets: ['West Africa', 'East Africa', 'Southern Africa'],
    status: 'Active',
  },
  {
    name: 'Latin America',
    description: 'Tropical forest conservation, REDD+ project structuring, and biodiversity credit pipeline development.',
    markets: ['Brazil', 'Colombia', 'Central America'],
    status: 'Active',
  },
  {
    name: 'Middle East & North Africa',
    description: 'Arid landscape restoration, renewable energy ecology, and sovereign sustainability advisory.',
    markets: ['GCC States', 'North Africa'],
    status: 'Expanding',
  },
  {
    name: 'Asia-Pacific',
    description: 'Emerging nature credit markets, ISSB adoption advisory, and large-scale infrastructure ecology.',
    markets: ['Southeast Asia', 'Pacific Islands'],
    status: 'Expanding',
  },
]

function GlobalPresence() {
  const [ref, visible] = useReveal(0.15)

  return (
    <section id="global" className="py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <div>
            <span className="text-dark text-sm tracking-wider uppercase">
              Global Presence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3 mb-6">
              Operational across jurisdictions and biomes
            </h2>
            <p className="text-slate leading-relaxed mb-4">
              ESW adapts to local ecology, local regulation, and local capital markets.
              Our practice spans temperate, tropical, arid, and coastal biomes across
              five continents — with deep regulatory expertise in each jurisdiction.
            </p>
            <p className="text-slate leading-relaxed">
              Founded in Europe with deep roots in the EU regulatory framework,
              we extend our advisory practice to emerging and frontier markets where
              ecosystem services opportunities are rapidly scaling.
            </p>
          </div>

          {/* Right: Region cards */}
          <div className="space-y-3">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group p-5 rounded-sm border border-gray-200 bg-white hover:border-accent transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold group-hover:text-dark transition-colors duration-300">
                    {region.name}
                  </h3>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                      region.status === 'Active'
                        ? 'border-dark text-dark'
                        : 'border-accent text-accent'
                    }`}
                  >
                    {region.status}
                  </span>
                </div>
                <p className="text-sm text-slate leading-relaxed mb-3">
                  {region.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {region.markets.map((market) => (
                    <span
                      key={market}
                      className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-sm border border-gray-200 text-slate"
                    >
                      {market}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobalPresence
