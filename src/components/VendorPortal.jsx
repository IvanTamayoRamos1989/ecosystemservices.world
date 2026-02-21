import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

// ── Verification pipeline stages (mirrors Ontology VerificationStatus) ─
const PIPELINE_STAGES = ['Pending', 'Awaiting Upload', 'Under Review', 'Verified']

// ── Mock data (populates from Ontology + Airlock in production) ──────
const MOCK_ASSIGNMENTS = [
  {
    id: 'VER-001',
    assetId: 'AST-001',
    projectName: 'Corredores Verdes — Culiacán',
    role: 'Licensed Biologist (SEMARNAT)',
    deliverable: 'GEE Baseline Report: LST + NDVI + Tree Inventory (Signed)',
    deadline: '2026-04-15',
    status: 'Under Review',
    jurisdiction: 'Mexico (Sinaloa)',
    legalBasis: 'LGEEPA Art. 35 · NOM-059-SEMARNAT-2010',
    interventionType: 'Baseline Assessment',
    uploadedFile: null,
    documentHash: null,
  },
  {
    id: 'VER-002',
    assetId: 'AST-001',
    projectName: 'Corredores Verdes — Culiacán',
    role: 'Notary Public (Sinaloa)',
    deliverable: 'Municipal Land Access Agreements — 92 Parking Lots (Notarised)',
    deadline: '2026-03-30',
    status: 'Awaiting Upload',
    jurisdiction: 'Mexico (Sinaloa)',
    legalBasis: 'Ley del Notariado · Plan Parcial Zona Centro',
    interventionType: 'Legal',
    uploadedFile: null,
    documentHash: null,
  },
  {
    id: 'VER-003',
    assetId: 'AST-002',
    projectName: 'Solar Biodiversity — Algarve',
    role: 'Chartered Ecologist',
    deliverable: 'EIA Species Survey Report (Signed)',
    deadline: '2026-05-01',
    status: 'Under Review',
    jurisdiction: 'Portugal',
    legalBasis: 'DL 151-B/2013, Art. 18',
    interventionType: 'EIA',
    uploadedFile: 'eia-species-survey-signed.pdf',
    documentHash: 'sha256:a4f2e8...c91d',
  },
  {
    id: 'VER-004',
    assetId: 'AST-003',
    projectName: 'Mangrove Restoration — Mombasa',
    role: 'Verra VVB Auditor',
    deliverable: 'VCS Validation Report',
    deadline: '2026-06-15',
    status: 'Verified',
    jurisdiction: 'Kenya',
    legalBasis: 'Verra VCS Standard v4.5, §4.1',
    interventionType: 'Credit Issuance',
    uploadedFile: 'vvb-validation-report-signed.pdf',
    documentHash: 'sha256:d7a8fb...2e4f',
  },
]

// ── Status styling ──────────────────────────────────────────────────
const STATUS_STYLES = {
  Pending: 'text-sovereign-steel bg-sovereign-ash',
  'Awaiting Upload': 'text-status-pending bg-amber-50',
  'Under Review': 'text-navy bg-navy-50',
  Verified: 'text-status-active bg-emerald-50',
  Rejected: 'text-status-blocked bg-red-50',
}

function VendorPortal() {
  const [ref, visible] = useReveal()
  const [activeTab, setActiveTab] = useState('active')
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS)
  const [uploadStatus, setUploadStatus] = useState({})

  const activeAssignments = assignments.filter((a) => a.status !== 'Verified')
  const completedAssignments = assignments.filter((a) => a.status === 'Verified')
  const displayed = activeTab === 'active' ? activeAssignments : completedAssignments

  const handleUpload = (assignmentId) => {
    setUploadStatus((prev) => ({ ...prev, [assignmentId]: 'uploading' }))
    setTimeout(() => {
      setUploadStatus((prev) => ({ ...prev, [assignmentId]: 'uploaded' }))
      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentId ? { ...a, status: 'Under Review', documentHash: 'sha256:pending...' } : a))
      )
    }, 1500)
  }

  // Airlock status
  const totalVerifications = assignments.length
  const verifiedCount = assignments.filter((a) => a.status === 'Verified').length
  const airlockStatus = verifiedCount === totalVerifications ? 'CLEARED' : 'BLOCKED'

  return (
    <section id="vendor-portal" className="py-20 md:py-28 bg-white">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="mb-12">
          <div className="sovereign-rule pt-6 mb-4">
            <span className="text-label uppercase text-slate tracking-widest">Verification Portal</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy">
                Expert Verification Pipeline
              </h2>
              <p className="text-sm text-slate mt-2">
                Upload signed deliverables. No asset leaves the platform without human verification.
              </p>
            </div>
            {/* Airlock Status */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-label uppercase text-slate">Airlock</span>
              <span className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider ${
                airlockStatus === 'CLEARED'
                  ? 'bg-emerald-50 text-status-active'
                  : 'bg-red-50 text-status-blocked'
              }`}>
                {airlockStatus}
              </span>
              <span className="text-xs font-mono text-slate">{verifiedCount}/{totalVerifications}</span>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-px mb-8">
          {['active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-label uppercase tracking-widest font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-navy text-white'
                  : 'bg-sovereign-ash text-slate hover:bg-sovereign-silver'
              }`}
            >
              {tab === 'active'
                ? `Active (${activeAssignments.length})`
                : `Verified (${completedAssignments.length})`}
            </button>
          ))}
        </div>

        {/* Pipeline Overview */}
        <div className="mb-8 border border-sovereign-silver bg-sovereign-ivory">
          <div className="px-6 py-3 border-b-2 border-navy">
            <h3 className="text-label uppercase text-slate tracking-widest">Pipeline Overview</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {PIPELINE_STAGES.map((stage, i) => {
              const count = assignments.filter((a) => a.status === stage).length
              return (
                <div key={stage} className={`text-center p-6 ${i < 3 ? 'border-r border-sovereign-silver' : ''}`}>
                  <div className="text-2xl font-mono font-bold text-navy tabular-nums">{count}</div>
                  <div className="text-label uppercase text-slate mt-1">{stage}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Assignment Cards */}
        <div className="grid md:grid-cols-2 gap-px bg-sovereign-silver">
          {displayed.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white p-8 hover:bg-sovereign-ivory transition-colors"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate">{assignment.id}</span>
                    <span className="text-xs text-sovereign-steel">|</span>
                    <span className="text-xs font-mono text-slate">{assignment.assetId}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy">{assignment.projectName}</h3>
                </div>
                <span
                  className={`text-xs px-3 py-1 font-medium ${
                    STATUS_STYLES[assignment.status] || 'text-slate bg-sovereign-ash'
                  }`}
                >
                  {assignment.status}
                </span>
              </div>

              {/* Card Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Role</span>
                  <span className="text-charcoal font-medium">{assignment.role}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Deliverable</span>
                  <span className="text-charcoal text-right max-w-[60%]">{assignment.deliverable}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Jurisdiction</span>
                  <span className="text-charcoal">{assignment.jurisdiction}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Legal Basis</span>
                  <span className="text-charcoal font-mono text-xs">{assignment.legalBasis}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Deadline</span>
                  <span className="font-mono text-xs text-charcoal">{assignment.deadline}</span>
                </div>
                {assignment.documentHash && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Document Hash</span>
                    <span className="font-mono text-xs text-slate">{assignment.documentHash}</span>
                  </div>
                )}
              </div>

              {/* Pipeline Progress */}
              <div className="flex items-center gap-px mb-6">
                {PIPELINE_STAGES.map((stage, i) => {
                  const stageIndex = PIPELINE_STAGES.indexOf(assignment.status)
                  const isComplete = i <= stageIndex
                  return (
                    <div
                      key={stage}
                      className={`h-1 flex-1 ${isComplete ? 'bg-navy' : 'bg-sovereign-silver'}`}
                    />
                  )
                })}
              </div>

              {/* Upload Area */}
              {(assignment.status === 'Pending' || assignment.status === 'Awaiting Upload') && (
                <div className="border border-dashed border-sovereign-silver p-4 text-center hover:border-navy transition-colors">
                  {uploadStatus[assignment.id] === 'uploading' ? (
                    <p className="text-sm text-slate">Uploading & computing hash...</p>
                  ) : uploadStatus[assignment.id] === 'uploaded' ? (
                    <p className="text-sm text-navy font-medium">Deliverable submitted for review</p>
                  ) : (
                    <button
                      onClick={() => handleUpload(assignment.id)}
                      className="text-sm text-slate hover:text-navy transition-colors"
                    >
                      Upload signed deliverable (PDF)
                    </button>
                  )}
                </div>
              )}

              {/* Uploaded File */}
              {assignment.uploadedFile && (
                <div className="flex items-center gap-2 mt-4 text-sm text-slate">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  <span className="font-mono text-xs">{assignment.uploadedFile}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayed.length === 0 && (
          <div className="text-center py-16 border border-sovereign-silver bg-sovereign-ivory">
            <p className="text-slate">No {activeTab} verifications.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate">
          <span>All uploads verified via SHA-256 hash. Stamps expire after 365 days.</span>
          <span className="font-mono">Airlock v2.0</span>
        </div>
      </div>
    </section>
  )
}

export default VendorPortal
