import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We begin by understanding your project scope, stakeholders, and environmental context through comprehensive baseline assessments.',
  },
  {
    number: '02',
    title: 'Assess',
    description:
      'Our team maps ecosystem dependencies and impacts, quantifies natural capital, and identifies risks and opportunities.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We co-create regenerative strategies that align ecological outcomes with project objectives, backed by sustainable finance instruments.',
  },
  {
    number: '04',
    title: 'Implement',
    description:
      'We support execution with technical guidance, stakeholder coordination, and integration of monitoring frameworks from day one.',
  },
  {
    number: '05',
    title: 'Monitor & Report',
    description:
      'Continuous tracking of ecological and financial performance ensures accountability, adaptive management, and long-term value creation.',
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
