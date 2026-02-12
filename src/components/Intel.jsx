import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

const articles = [
  {
    date: 'January 2026',
    category: 'Biodiversity Credits',
    title: 'Verra Opens Nature Framework to All Projects',
    summary:
      'Verra has opened its Nature Framework certification process to all projects globally, enabling quantification of biodiversity outcomes and generation of Nature Credits under the SD VISta standard. First validation/verification bodies approved throughout 2025.',
    tags: ['Verra', 'Nature Credits', 'SD VISta'],
    highlight: true,
  },
  {
    date: 'December 2025',
    category: 'EU Regulation',
    title: 'CSRD Omnibus: Scope Reduced by 85%, Thresholds Raised',
    summary:
      'Council and Parliament reached provisional agreement on the Omnibus Simplification Package. CSRD scope now requires both >1,000 employees and >EUR 450M turnover. Mandatory ESRS data points reduced by 61%. Applies from FY 2027.',
    tags: ['CSRD', 'ESRS', 'EU Taxonomy'],
  },
  {
    date: 'November 2025',
    category: 'Carbon Markets',
    title: 'Article 6.2 Crediting Protocol Published at COP30',
    summary:
      'Singapore, Gold Standard, and Verra published the final Article 6.2 Crediting Protocol at COP30 in Belem, enabling governments to use independent crediting programs for national climate goals under the Paris Agreement.',
    tags: ['Article 6', 'COP30', 'Paris Agreement'],
  },
  {
    date: 'November 2025',
    category: 'Disclosure',
    title: 'ISSB to Develop Nature Disclosure Standard, Drawing on TNFD',
    summary:
      'The ISSB announced it will advance nature-related disclosure requirements, drawing on the TNFD framework. TNFD signed a MoU with the IFRS Foundation and will complete technical work by Q3 2026. Exposure Draft targeted for COP17 in October 2026.',
    tags: ['TNFD', 'ISSB', 'IFRS'],
  },
  {
    date: 'July 2025',
    category: 'EU Policy',
    title: 'European Commission Launches Roadmap towards Nature Credits',
    summary:
      'The EC launched its formal Roadmap for a nature credit system across the EU. Expert group established in 2025, certification framework principles due 2027. Nature credits defined as quantifiable, fungible units for verified biodiversity outcomes.',
    tags: ['EU', 'Nature Credits', 'Biodiversity'],
    highlight: true,
  },
  {
    date: 'February 2025',
    category: 'COP16',
    title: 'COP16 Rome: $200 Billion/Year Biodiversity Finance Target Agreed',
    summary:
      'The resumed COP16 session in Rome completed all remaining agenda items, agreeing on a resource mobilization strategy of at least $200 billion/year by 2030. The Cali Fund for DSI benefit-sharing was officially launched by UNDP and UNEP.',
    tags: ['COP16', 'CBD', 'Biodiversity Finance'],
  },
  {
    date: 'January 2025',
    category: 'Green Bonds',
    title: 'First Corporate European Green Bond Issued Under New EuGB Standard',
    summary:
      'A2A S.p.A. issued the first-ever corporate EuGB (EUR 500M, 4.4x oversubscribed), followed by EIB\'s EUR 3 billion issuance at 13x oversubscription. Over EUR 22 billion issued under the standard in its first year.',
    tags: ['EuGB', 'Green Bonds', 'EU Taxonomy'],
  },
  {
    date: '2025',
    category: 'NbS Policy',
    title: 'EU Nature Restoration Law Enters Implementation Phase',
    summary:
      'Member States must prepare National Restoration Plans by September 2026. Targets: restoration measures on at least 20% of EU land and sea areas by 2030, with 30% of habitats in poor condition restored. Commission adopted a uniform format for plans in May 2025.',
    tags: ['EU NRL', 'Restoration', 'NbS'],
  },
]

const categories = ['All', ...new Set(articles.map((a) => a.category))]

function Intel() {
  const [ref, visible] = useReveal()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  return (
    <section id="intel" className="py-24 md:py-32 bg-white/[0.01]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-2xl mb-12">
          <span className="text-accent text-sm tracking-wider uppercase">Intel</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Sector intelligence
          </h2>
          <p className="text-gray-400">
            Regulatory developments, market movements, and policy shifts shaping the
            ecosystem services landscape. Curated by ESW&apos;s research team.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <article
              key={article.title}
              className={`group p-8 rounded-lg border bg-white/[0.02] hover:border-accent/30 transition-all duration-300 flex flex-col ${
                article.highlight ? 'border-accent/20' : 'border-white/5'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs tracking-wider uppercase text-accent">
                  {article.category}
                </span>
                <span className="text-gray-700">|</span>
                <span className="text-xs text-gray-600">{article.date}</span>
              </div>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase px-2 py-1 rounded border border-white/10 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Intel
