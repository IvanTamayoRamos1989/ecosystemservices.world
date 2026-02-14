import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

const testimonials = [
  {
    quote:
      'ESW brought a level of ecological rigour that fundamentally changed how we approached our solar portfolio. Their biodiversity credit structuring unlocked a revenue stream we hadn\'t considered.',
    author: 'Director of Sustainability',
    org: 'European Renewable Energy Developer',
    sector: 'Energy',
  },
  {
    quote:
      'The integrated approach — science, finance, and legal in one engagement — eliminated the coordination overhead we\'d faced with multiple consultancies. The TNFD reporting was audit-ready on first delivery.',
    author: 'Chief Financial Officer',
    org: 'Infrastructure Fund, West Africa',
    sector: 'Infrastructure',
  },
  {
    quote:
      'Their understanding of the EU Taxonomy and CSRD requirements is exceptional. ESW helped us achieve full compliance while identifying genuine value in our ecological assets.',
    author: 'Head of ESG',
    org: 'Pan-European Real Estate Group',
    sector: 'Real Estate',
  },
]

function Testimonials() {
  const [ref, visible] = useReveal(0.15)
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 md:py-32 bg-white/[0.01]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-sm tracking-wider uppercase">
            Client Perspectives
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Trusted by institutional decision-makers
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Quote */}
          <div className="relative mb-10">
            <svg
              className="absolute -top-4 -left-4 w-12 h-12 text-accent/10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
            </svg>
            <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed pl-8 border-l-2 border-accent/30">
              {testimonials[active].quote}
            </blockquote>
          </div>

          {/* Attribution */}
          <div className="pl-8 mb-10">
            <div className="text-white font-semibold">
              {testimonials[active].author}
            </div>
            <div className="text-sm text-gray-500">{testimonials[active].org}</div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-2 bg-accent'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
