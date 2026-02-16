import React from 'react'
import useReveal from '../hooks/useReveal'

const capabilities = [
  {
    label: 'Origination',
    title: 'Green Value Identification',
    description: 'We identify latent ecological value in grey infrastructure — converting drainage systems into funded linear parks, rooftops into biodiversity credits, brownfields into bankable restoration assets.',
  },
  {
    label: 'Structuring',
    title: 'Capital Stack Optimization',
    description: 'Matching projects with concessional instruments — C40 CFF, NADBank, resilience bonds, green SLBs — to reduce CAPEX and unlock institutional capital at lower cost.',
  },
  {
    label: 'Verification',
    title: 'Liability Management',
    description: 'Orchestrating the full lifecycle from pre-feasibility to the final, human-stamped Legal Opinion required for financial close. AI does the work; licensed experts provide the stamp.',
  },
]

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="py-20 md:py-28 bg-sovereign-ivory">
      <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="mb-16">
          <div className="sovereign-rule pt-6 mb-4">
            <span className="text-label uppercase text-slate tracking-widest">About ESW</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-6">
                The operating system for nature-based infrastructure finance.
              </h2>
            </div>
            <div>
              <p className="text-slate leading-relaxed mb-4">
                In an era of high interest rates and tightening regulations (CSRD, TNFD),
                traditional infrastructure development is becoming prohibitively expensive.
                ESW solves this by engineering Nature-Based Solutions not just for compliance,
                but for <strong className="text-navy font-medium">Capital Stack Optimization</strong>.
              </p>
              <p className="text-slate leading-relaxed">
                We lower the cost of capital for global infrastructure projects by integrating
                audit-ready nature assets that unlock concessional loans, green bonds, and
                non-dilutive grants. We turn sustainability from a cost center into a profit driver.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="border-t-2 border-navy pt-8 mb-16">
          <div className="max-w-3xl">
            <span className="text-label uppercase text-slate tracking-widest">Our Thesis</span>
            <blockquote className="font-serif text-2xl md:text-3xl text-navy leading-relaxed mt-4">
              The transition to a regenerative planet will be driven by capital, not charity.
            </blockquote>
            <p className="text-slate mt-4 leading-relaxed">
              By unlocking financial liquidity, easing constraints, and engineering higher yields
              for nature-positive projects, we help companies and governments build a more
              sustainable world — not as a moral obligation, but as a competitive financial advantage.
            </p>
          </div>
        </div>

        {/* What We Do — 3 Pillars */}
        <div className="mb-8">
          <span className="text-label uppercase text-slate tracking-widest">Digital Prime Contractor</span>
          <p className="text-sm text-slate mt-2 mb-8 max-w-xl">
            We combine an AI-driven Ontology of global environmental data with a network
            of licensed human experts — Engineers, Biologists, Auditors — to deliver:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-sovereign-silver">
          {capabilities.map((cap, i) => (
            <div key={cap.title} className="bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-slate">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-label uppercase text-navy font-semibold tracking-widest">{cap.label}</span>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-3">{cap.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-8 pt-4 border-t border-sovereign-silver flex items-center justify-between">
          <span className="text-xs text-slate">ESW: Regenerative Capital</span>
          <span className="text-label uppercase text-slate tracking-widest">Science + Capital + Compliance</span>
        </div>
      </div>
    </section>
  )
}

export default About
