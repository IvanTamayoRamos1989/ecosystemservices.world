import React from 'react'

const services = [
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
      'Comprehensive analysis of how large-scale projects affect local and regional ecosystems, from biodiversity to water systems and carbon cycles.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
        <path d="M12 6v6l3 3" />
      </svg>
    ),
    title: 'Regenerative Strategy Design',
    description:
      'Developing actionable plans that go beyond mitigation — restoring ecosystems, enhancing biodiversity, and building long-term ecological resilience.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20" />
        <path d="M5 20V8l4-4 4 4v12" />
        <path d="M13 20V12l4-4 4 4v8" />
        <path d="M8 12h1M8 16h1M16 16h1" />
      </svg>
    ),
    title: 'Ecosystem Valuation',
    description:
      'Quantifying the economic value of ecosystem services — provisioning, regulating, cultural, and supporting — to inform decision-making and investment.',
  },
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
      'Designing green bonds, biodiversity credits, carbon instruments, and blended finance structures that fund regenerative outcomes.',
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
    title: 'Regulatory & Compliance Advisory',
    description:
      'Navigating environmental regulations, ESG frameworks, TNFD reporting, and biodiversity compliance across jurisdictions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12l3-3 3 3 4-4 4 4 4-4" />
        <path d="M3 18l3-3 3 3 4-4 4 4 4-4" />
      </svg>
    ),
    title: 'Monitoring & Reporting',
    description:
      'Ongoing measurement of ecosystem health, project impact, and financial returns — ensuring transparency and accountability over time.',
  },
]

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm tracking-wider uppercase">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            End-to-end ecosystem services consulting
          </h2>
          <p className="text-gray-400">
            From initial assessment to long-term monitoring, we provide the expertise
            and tools to integrate ecosystem thinking into every phase of your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
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
    </section>
  )
}

export default Services
