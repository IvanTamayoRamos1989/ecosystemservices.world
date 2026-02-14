import React, { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const metrics = [
  { value: 50, suffix: '+', label: 'Projects Delivered', prefix: '' },
  { value: 12, suffix: '', label: 'Countries of Operation', prefix: '' },
  { value: 85, suffix: 'k', label: 'Hectares Assessed', prefix: '' },
  { value: 200, suffix: 'M+', label: 'USD in Green Finance Structured', prefix: '$' },
]

function useCounter(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isVisible || hasRun.current) return
    hasRun.current = true

    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

function MetricCard({ metric, visible, delay }) {
  const count = useCounter(metric.value, visible)

  return (
    <div
      className="text-center p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/20 transition-all duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-mono tabular-nums">
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div className="text-sm text-gray-500 tracking-wider uppercase">{metric.label}</div>
    </div>
  )
}

function ImpactMetrics() {
  const [ref, visible] = useReveal(0.2)

  return (
    <section className="py-20 md:py-28">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-12">
          <span className="text-accent text-sm tracking-wider uppercase">Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Measurable outcomes, global reach
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              visible={visible}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactMetrics
