import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

const testimonials = [
  {
    quote:
      'ESW delivered the full package — from GEE baseline analysis to blended finance structuring across C40 CFF, CAF, and federal instruments. They understand how to make Nature-Based Solutions bankable for Latin American cities.',
    author: 'Director of Urban Planning',
    org: 'Municipal Government, Pacific Mexico',
    sector: 'Urban NbS',
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
      'ESW structured our NbS proposal against NOM-004-SEDATU, Plan Avanza, and IDB Environmental and Social Policy Framework simultaneously. No other consultancy could operate across all three compliance layers.',
    author: 'Director of Climate Finance',
    org: 'Development Finance Institution, LATAM',
    sector: 'Climate Finance',
  },
]

function Testimonials() {
  const [ref, visible] = useReveal(0.15)
  const [active, setActive] = useState(0)

  return (
    <section className="py-24 md:py-32 bg-cultured">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-navy text-sm tracking-wider uppercase">
            Client Perspectives
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mt-3">
            Trusted by institutional decision-makers
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Quote */}
          <div className="relative mb-10">
            <svg
              className="absolute -top-4 -left-4 w-12 h-12 text-navy/10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
            </svg>
            <blockquote className="text-lg md:text-xl text-sovereign-ink leading-relaxed pl-8 border-l-2 border-navy font-serif italic">
              {testimonials[active].quote}
            </blockquote>
          </div>

          {/* Attribution */}
          <div className="pl-8 mb-10">
            <div className="text-sovereign-ink font-semibold">
              {testimonials[active].author}
            </div>
            <div className="text-sm text-slate">{testimonials[active].org}</div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 ${
                  i === active
                    ? 'w-8 h-1 bg-navy rounded-sm'
                    : 'w-2 h-1 bg-gray-300 hover:bg-gray-400 rounded-sm'
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
