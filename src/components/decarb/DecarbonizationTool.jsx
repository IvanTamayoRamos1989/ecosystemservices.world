import React, { useState } from 'react'
import FileUploadPanel from './FileUploadPanel'
import CalculationTable from './CalculationTable'
import ReportOutput from './ReportOutput'
import {
  calculateEmissions, summarizeByScope,
  runDiagnostic, buildPathway, calculateMACC,
  autoAssignCosts,
} from '../../lib/decarbEngine'

const STEPS = [
  { id: 'input', label: '1. Inventario', desc: 'Carga de datos' },
  { id: 'calculate', label: '2. Cálculo', desc: 'Análisis y medidas' },
  { id: 'report', label: '3. Informe', desc: 'Plan de descarbonización' },
]

export default function DecarbonizationTool({ onClose }) {
  const [step, setStep] = useState('input')
  const [sources, setSources] = useState([])
  const [orgData, setOrgData] = useState({})
  const [results, setResults] = useState([])
  const [summary, setSummary] = useState(null)
  const [diagnostic, setDiagnostic] = useState(null)
  const [measures, setMeasures] = useState([])
  const [macc, setMacc] = useState(null)

  const handleDataLoaded = (data) => {
    setOrgData(data.org)
    const consolidation = parseFloat(data.org.consolidacion) || 100
    const calcResults = calculateEmissions(data.sources, consolidation)
    const calcSummary = summarizeByScope(calcResults)
    const calcDiag = runDiagnostic(calcResults, 42, parseInt(data.org.anio) || 2023, 2030)
    const calcMeasures = buildPathway(calcDiag)
    const withCosts = autoAssignCosts(calcMeasures)

    setResults(calcResults)
    setSummary(calcSummary)
    setDiagnostic(calcDiag)
    setMeasures(withCosts)
    setStep('calculate')
  }

  const handleGenerateReport = () => {
    const calcMacc = calculateMACC(measures)
    setMacc(calcMacc)
    setStep('report')
  }

  const goBack = () => {
    if (step === 'report') setStep('calculate')
    else if (step === 'calculate') setStep('input')
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-sovereign-silver">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-slate hover:text-navy transition-colors" aria-label="Cerrar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="font-serif text-2xl text-navy leading-none">Herramienta de Descarbonización</h1>
              <p className="text-xs text-slate mt-0.5">GHG Protocol · SBTi 1.5°C · MACC Analysis</p>
            </div>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); onClose() }}
            className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-navy">ESW</span>
          </a>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="border-b border-sovereign-silver bg-sovereign-ash">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-0">
          {STEPS.map((s, i) => {
            const isActive = s.id === step
            const isPast = STEPS.findIndex(x => x.id === step) > i
            return (
              <React.Fragment key={s.id}>
                {i > 0 && <div className={`w-12 h-px mx-2 ${isPast ? 'bg-navy' : 'bg-sovereign-silver'}`} />}
                <button
                  onClick={() => {
                    if (isPast) setStep(s.id)
                  }}
                  className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                    isActive ? 'bg-navy text-white' :
                    isPast ? 'text-navy cursor-pointer hover:bg-navy-50' :
                    'text-slate cursor-default'
                  }`}
                >
                  <span className={`w-6 h-6 flex items-center justify-center text-xs font-mono ${
                    isActive ? 'bg-white text-navy' : isPast ? 'bg-navy text-white' : 'bg-sovereign-silver text-slate'
                  }`}>{i + 1}</span>
                  <div className="text-left">
                    <p className="text-label uppercase leading-none">{s.label}</p>
                    <p className="text-[10px] opacity-70">{s.desc}</p>
                  </div>
                </button>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {step !== 'input' && (
            <button onClick={goBack}
              className="text-label uppercase text-slate hover:text-navy mb-6 flex items-center gap-1 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver al paso anterior
            </button>
          )}

          {step === 'input' && (
            <FileUploadPanel
              onDataLoaded={handleDataLoaded}
              sources={sources}
              setSources={setSources}
            />
          )}

          {step === 'calculate' && summary && (
            <CalculationTable
              results={results}
              summary={summary}
              diagnostic={diagnostic}
              measures={measures}
              setMeasures={setMeasures}
              onGenerateReport={handleGenerateReport}
            />
          )}

          {step === 'report' && macc && (
            <ReportOutput
              orgData={orgData}
              summary={summary}
              diagnostic={diagnostic}
              macc={macc}
              results={results}
            />
          )}
        </div>
      </div>
    </div>
  )
}
