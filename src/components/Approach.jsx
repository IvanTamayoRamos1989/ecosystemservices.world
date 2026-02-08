import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Client brief, site context, and stakeholder mapping. We classify the project, identify the applicable regulatory framework, and define the scope of work.',
  },
  {
    number: '02',
    title: 'Baseline Assessment',
    description:
      'Desktop study and field surveys: habitat condition, species inventory, soil and water analysis. GIS constraint mapping overlaid with satellite data — adapted to biome and jurisdiction.',
  },
  {
    number: '03',
    title: 'Strategy Design',
    description:
      'Full mitigation hierarchy: Avoid, Minimize, Restore, Offset. Nature-based Solutions engineered for local conditions — agrivoltaics, swales, agroforestry, pollinator corridors, native revegetation.',
  },
  {
    number: '04',
    title: 'Financial Structuring',
    description:
      'Quantify carbon and biodiversity credit potential. Model ROI, CAPEX vs. credit revenue, and green bond eligibility. Produce bankability assessments for investors and lenders.',
  },
  {
    number: '05',
    title: 'Legal & Compliance',
    description:
      'Permitting roadmap, land tenure verification, contract drafting, and CSRD/TNFD/ISSB compliance checks — structured for the applicable jurisdiction.',
  },
  {
    number: '06',
    title: 'Implement & Monitor',
    description:
      'Technical supervision, stakeholder coordination, and continuous ecological + financial performance tracking. Annual reporting and adaptive management.',
  },
]

function Approach() {
  return (
    <section id="approach" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-accent text-sm tracking-wider uppercase">How We Work</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            A rigorous, collaborative approach
          </h2>
          <p className="text-gray-400">
            Our methodology integrates scientific assessment with financial innovation,
            ensuring that every project delivers measurable ecological and economic value.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6 sm:gap-8 group">
                {/* Step number */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-accent/30 bg-dark flex items-center justify-center text-accent text-sm font-mono group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Approach
