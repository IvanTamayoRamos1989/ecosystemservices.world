import React from 'react'
import useReveal from '../hooks/useReveal'

const departments = [
  {
    label: 'Technical Core',
    tagline: 'The Science',
    services: [
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        ),
        title: 'Environmental Impact Assessment',
        description:
          'Multi-jurisdictional EIA across EU, US, LATAM, APAC, and African regulatory frameworks. Biodiversity baselines, habitat scoring, species risk — adapted to any biome.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
            <path d="M12 6v6l3 3" />
          </svg>
        ),
        title: 'Regenerative Design & NbS',
        description:
          'Nature-based Solutions that go beyond mitigation. Agrivoltaics, pollinator corridors, constructed wetlands, soil restoration — applying the full mitigation hierarchy.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
        ),
        title: 'Spatial Analysis & GIS',
        description:
          'Site mapping, constraints overlay, satellite monitoring (NDVI, land use change). Global data integration — Copernicus, Landsat, national cadastres, and protected area networks.',
      },
    ],
  },
  {
    label: 'Commercial & Legal',
    tagline: 'The Deal',
    services: [
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="6" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 14h4M6 17h2" />
          </svg>
        ),
        title: 'Sustainable Finance Structuring',
        description:
          'Carbon credits (Verra/Gold Standard), biodiversity credits, green bonds, and blended finance. ROI modelling and bankability assessments for investors.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H2v7l6.3-6.3" />
            <path d="M15 5h7v7l-6.3-6.3" />
            <path d="M9 19H2v-7l6.3 6.3" />
            <path d="M15 19h7v-7l-6.3 6.3" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ),
        title: 'Regulatory & Compliance',
        description:
          'CSRD, EU Taxonomy, TNFD, ISSB disclosure. Environmental permitting across jurisdictions — EU, US EPA, national frameworks. Cross-border compliance structuring.',
      },
      {
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M9 15h6M9 11h6" />
          </svg>
        ),
        title: 'Legal Advisory & Contracts',
        description:
          'Multi-jurisdictional environmental law, land tenure verification, service contracts, credit purchase agreements, and liability assessment for large-scale regenerative projects.',
      },
    ],
  },
]

function Services() {
  const [ref, visible] = useReveal()

  return (
    <section id="services" className="py-24 md:py-32 bg-white/[0.01]">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm tracking-wider uppercase">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Integrated advisory across the project lifecycle
          </h2>
          <p className="text-gray-400">
            From ecological baseline to credit issuance, our teams integrate
            science, design, finance, and legal structuring into every phase
            of the engagement.
          </p>
        </div>

        {departments.map((dept) => (
          <div key={dept.label} className="mb-12 last:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-xs tracking-wider uppercase text-gray-500">
                {dept.label} — <span className="text-accent">{dept.tagline}</span>
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.services.map((service) => (
                <div
                  key={service.title}
                  className="group p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
