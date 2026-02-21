import React, { useState, useMemo } from 'react'
import useReveal from '../hooks/useReveal'

// ── Pricing logic (mirrors pricing_engine.py + roi_estimator.py) ──────
const BASE_RATE_USD = 25000
const COMPLEXITY_RANGES = [
  { min: 1, max: 3, mult: 1.0 },
  { min: 4, max: 6, mult: 1.8 },
  { min: 7, max: 8, mult: 2.8 },
  { min: 9, max: 10, mult: 4.0 },
]
const CLIENT_DISCOUNTS = {
  government: 0.85,
  ngo: 0.75,
  developer: 1.0,
}
const SUCCESS_FEE_SCHEDULE = [
  { maxImpact: 2.5, pct: 0.005 },
  { maxImpact: 5.0, pct: 0.015 },
  { maxImpact: 7.5, pct: 0.025 },
  { maxImpact: Infinity, pct: 0.035 },
]
const TRADITIONAL_COSTS = {
  small: 135000,
  medium: 260000,
  large: 395000,
}
const IDB_RETURN_RATIO = 4.0
const MONTHS_TRADITIONAL = 18
const MONTHS_ESW = 12

function calculateROI(hectares, jurisdiction, clientType, capex) {
  const complexity = Math.min(10, Math.max(1, Math.round(hectares / 5000 + 3)))
  const capexScore = Math.min(capex / 10000000, 10.0)
  const impactScore = 0.5 * capexScore + 0.5 * complexity

  const complexityMult = COMPLEXITY_RANGES.find(r => complexity >= r.min && complexity <= r.max)?.mult || 1.0
  const clientDiscount = CLIENT_DISCOUNTS[clientType] || 1.0
  let upfront = BASE_RATE_USD * complexityMult * clientDiscount

  const successPct = SUCCESS_FEE_SCHEDULE.find(s => impactScore < s.maxImpact)?.pct || 0.035

  if (impactScore >= 7.0) {
    upfront *= 0.6
  }

  const successFee = capex * successPct
  const traditionalCost = capex >= 20000000 ? TRADITIONAL_COSTS.large : capex >= 5000000 ? TRADITIONAL_COSTS.medium : TRADITIONAL_COSTS.small
  const savings = traditionalCost - upfront
  const savingsPct = traditionalCost > 0 ? (savings / traditionalCost * 100) : 0
  const economicValue = capex * IDB_RETURN_RATIO
  const timeSaved = MONTHS_TRADITIONAL - MONTHS_ESW

  const tier = impactScore >= 6 ? 'Enterprise' : impactScore >= 3 ? 'Professional' : 'Essentials'
  const tierPricing = { Essentials: 12000, Professional: 36000, Enterprise: 96000 }

  return {
    impactScore: Math.round(impactScore * 10) / 10,
    complexity,
    upfrontFee: Math.round(upfront),
    successFeePct: (successPct * 100).toFixed(1),
    successFeeEstimate: Math.round(successFee),
    traditionalCost,
    savings: Math.round(savings),
    savingsPct: Math.round(savingsPct),
    economicValue,
    timeSaved,
    tier,
    tierAnnual: tierPricing[tier],
    npv: Math.round(economicValue - upfront - successFee),
  }
}

const JURISDICTIONS = [
  'EU (CSRD Region)',
  'United Kingdom',
  'Mexico',
  'Kenya',
  'Morocco',
  'Portugal',
  'Brazil',
  'Indonesia',
  'India',
  'United States',
  'Other',
]

function ROICalculator() {
  const [ref, visible] = useReveal(0.1)
  const [hectares, setHectares] = useState('')
  const [jurisdiction, setJurisdiction] = useState('')
  const [clientType, setClientType] = useState('developer')
  const [capex, setCapex] = useState('')
  const [showResults, setShowResults] = useState(false)

  const parsedHectares = parseFloat(hectares) || 0
  const parsedCapex = parseFloat(capex) || 0

  const result = useMemo(() => {
    if (parsedHectares > 0 && parsedCapex > 0) {
      return calculateROI(parsedHectares, jurisdiction, clientType, parsedCapex)
    }
    return null
  }, [parsedHectares, jurisdiction, clientType, parsedCapex])

  const handleCalculate = (e) => {
    e.preventDefault()
    if (result) setShowResults(true)
  }

  const formatUSD = (n) => {
    if (n >= 1000000000) return `$${(n / 1000000000).toFixed(1)}B`
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
    return `$${n.toLocaleString()}`
  }

  return (
    <section id="roi-calculator" className="py-20 md:py-28 bg-sovereign-ivory">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="mb-12">
          <div className="sovereign-rule pt-6 mb-4">
            <span className="text-label uppercase text-slate tracking-widest">Investment Calculator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
            Nature Asset ROI Estimator
          </h2>
          <p className="text-sm text-slate mt-2 max-w-xl">
            Input your project parameters. Receive an instant valuation based on ESW pricing models,
            IDB NbS benchmarks, and blended finance structuring rates. Try: 10 ha / $40M / Mexico / Government for the Culiacán scenario.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCalculate} className="border border-sovereign-silver bg-white p-8">
              <h3 className="text-label uppercase text-slate tracking-widest mb-6 pb-3 border-b-2 border-navy">
                Site Parameters
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-label uppercase text-slate mb-2">Site Area (Hectares)</label>
                  <input
                    type="number"
                    value={hectares}
                    onChange={(e) => { setHectares(e.target.value); setShowResults(false) }}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 border border-sovereign-silver bg-white text-navy font-mono text-sm focus:border-navy focus:outline-none transition-colors"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-label uppercase text-slate mb-2">Project CAPEX (USD)</label>
                  <input
                    type="number"
                    value={capex}
                    onChange={(e) => { setCapex(e.target.value); setShowResults(false) }}
                    placeholder="e.g. 10000000"
                    className="w-full px-4 py-3 border border-sovereign-silver bg-white text-navy font-mono text-sm focus:border-navy focus:outline-none transition-colors"
                    min="100000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-label uppercase text-slate mb-2">Jurisdiction</label>
                  <select
                    value={jurisdiction}
                    onChange={(e) => { setJurisdiction(e.target.value); setShowResults(false) }}
                    className="w-full px-4 py-3 border border-sovereign-silver bg-white text-navy text-sm focus:border-navy focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select jurisdiction</option>
                    {JURISDICTIONS.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-label uppercase text-slate mb-2">Client Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'developer', label: 'Developer' },
                      { value: 'government', label: 'Government' },
                      { value: 'ngo', label: 'NGO' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => { setClientType(type.value); setShowResults(false) }}
                        className={`py-2.5 text-xs uppercase tracking-wider font-medium border transition-colors ${
                          clientType === type.value
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-slate border-sovereign-silver hover:border-navy'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy text-white font-medium text-sm tracking-wider uppercase hover:bg-navy-800 transition-colors mt-4"
                >
                  Calculate ROI
                </button>
              </div>
            </form>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            {showResults && result ? (
              <div className="border border-sovereign-silver bg-white">
                {/* Results Header */}
                <div className="p-8 border-b-2 border-navy">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-label uppercase text-slate">Estimated Net Present Value</span>
                      <div className="text-metric-lg font-mono font-bold text-navy tabular-nums mt-2">
                        {formatUSD(result.npv)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-label uppercase text-slate">Impact Score</span>
                      <div className="text-metric font-mono font-bold text-navy tabular-nums mt-2">
                        {result.impactScore}
                      </div>
                      <div className="text-xs text-slate">/10.0</div>
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="p-8 border-b border-sovereign-silver">
                  <h4 className="text-label uppercase text-slate tracking-widest mb-4">ESW Fee Structure</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Upfront Advisory Fee</span>
                      <span className="font-mono tabular-nums font-semibold text-navy">{formatUSD(result.upfrontFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Success Fee ({result.successFeePct}% at close)</span>
                      <span className="font-mono tabular-nums text-charcoal">{formatUSD(result.successFeeEstimate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Subscription Tier</span>
                      <span className="text-charcoal">{result.tier} — {formatUSD(result.tierAnnual)}/yr</span>
                    </div>
                    <div className="sovereign-rule mt-4 pt-4 flex justify-between text-sm font-semibold">
                      <span className="text-navy">vs. Traditional Consulting</span>
                      <span className="font-mono tabular-nums text-status-active">
                        Save {formatUSD(result.savings)} ({result.savingsPct}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Value Metrics */}
                <div className="p-8 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-label uppercase text-slate mb-2">Projected Economic Return</div>
                    <div className="text-2xl font-mono font-bold text-navy tabular-nums">{formatUSD(result.economicValue)}</div>
                    <div className="text-xs text-slate mt-1">4:1 return ratio (IDB NbS benchmark)</div>
                  </div>
                  <div>
                    <div className="text-label uppercase text-slate mb-2">Time to Bankability</div>
                    <div className="text-2xl font-mono font-bold text-navy tabular-nums">{MONTHS_ESW} months</div>
                    <div className="text-xs text-status-active mt-1">{result.timeSaved} months faster than traditional</div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-8 bg-navy">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Ready to unlock this value?</p>
                      <p className="text-sovereign-steel text-sm mt-1">
                        Create an account to access detailed projections and start your engagement.
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="px-6 py-3 bg-white text-navy font-medium text-sm tracking-wider uppercase hover:bg-sovereign-ivory transition-colors whitespace-nowrap"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-sovereign-silver bg-white p-16 flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="w-16 h-16 border-2 border-sovereign-silver flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9AA5B4" strokeWidth="1.5">
                    <path d="M3 3v18h18" />
                    <path d="M7 16l4-8 4 4 6-10" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-navy mb-2">Enter Site Parameters</h3>
                <p className="text-sm text-slate max-w-sm">
                  Input your project details to receive an instant ROI estimate
                  powered by ESW pricing models and IDB NbS benchmarks.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-4 border-t border-sovereign-silver">
          <p className="text-xs text-slate">
            Estimates are indicative and based on IDB NbS economic return data (2015-2020), C40 CFF acceptance
            benchmarks, and current voluntary carbon market pricing. Actual returns depend on site-specific
            conditions, regulatory environment, and market dynamics. This is not financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ROICalculator
