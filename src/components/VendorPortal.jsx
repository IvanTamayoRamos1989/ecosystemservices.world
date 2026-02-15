import React, { useState } from 'react'
import useReveal from '../hooks/useReveal'

// ── Status pipeline stages ───────────────────────────────────────────
const PIPELINE_STAGES = ['Assigned', 'In Progress', 'Submitted', 'Accepted']

// ── Mock data (replace with API integration when backend is established) ──
const MOCK_ASSIGNMENTS = [
  {
    id: 'HR-001',
    projectName: 'Green Corridors — Culiacán',
    role: 'Licensed Biologist',
    deliverable: 'Ecological Baseline Report (Signed)',
    deadline: '2026-04-15',
    status: 'In Progress',
    jurisdiction: 'Mexico (Sinaloa)',
    legalBasis: 'LGEEPA Art. 35',
    uploadedFile: null,
  },
  {
    id: 'HR-002',
    projectName: 'Green Corridors — Culiacán',
    role: 'Notary Public',
    deliverable: 'Land Access Agreement (Notarised)',
    deadline: '2026-03-30',
    status: 'Assigned',
    jurisdiction: 'Mexico (Sinaloa)',
    legalBasis: 'Ley del Notariado para el Estado de Sinaloa',
    uploadedFile: null,
  },
  {
    id: 'HR-003',
    projectName: 'Algarve Solar Biodiversity',
    role: 'Chartered Ecologist',
    deliverable: 'EIA Species Survey Report (Signed)',
    deadline: '2026-05-01',
    status: 'Submitted',
    jurisdiction: 'Portugal',
    legalBasis: 'DL 151-B/2013, Art. 18',
    uploadedFile: 'eia-species-survey-signed.pdf',
  },
  {
    id: 'HR-004',
    projectName: 'Mombasa Mangrove Restoration',
    role: 'Verra VVB Auditor',
    deliverable: 'VCS Validation Report',
    deadline: '2026-06-15',
    status: 'Accepted',
    jurisdiction: 'Kenya',
    legalBasis: 'Verra VCS Standard v4.5, §4.1',
    uploadedFile: 'vvb-validation-report-signed.pdf',
  },
]

// ── Status colour mapping ────────────────────────────────────────────
const STATUS_COLORS = {
  Assigned: 'text-yellow-400 bg-yellow-400/10',
  'In Progress': 'text-blue-400 bg-blue-400/10',
  Submitted: 'text-purple-400 bg-purple-400/10',
  Accepted: 'text-accent bg-accent/10',
}

function VendorPortal() {
  const [ref, visible] = useReveal()
  const [activeTab, setActiveTab] = useState('active')
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS)
  const [uploadStatus, setUploadStatus] = useState({})

  const activeAssignments = assignments.filter((a) => a.status !== 'Accepted')
  const completedAssignments = assignments.filter((a) => a.status === 'Accepted')
  const displayed = activeTab === 'active' ? activeAssignments : completedAssignments

  const handleUpload = (assignmentId) => {
    setUploadStatus((prev) => ({ ...prev, [assignmentId]: 'uploading' }))
    setTimeout(() => {
      setUploadStatus((prev) => ({ ...prev, [assignmentId]: 'uploaded' }))
      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentId ? { ...a, status: 'Submitted' } : a))
      )
    }, 1500)
  }

  return (
    <section id="vendor-portal" className="py-24 md:py-32 bg-white/[0.01]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-accent text-sm tracking-wider uppercase">Vendor Portal</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Expert Assignments</h2>
          <p className="text-gray-400">
            Review your active assignments, upload signed deliverables, and track acceptance status.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex justify-center gap-4 mb-10">
          {['active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-accent text-dark'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab === 'active'
                ? `Active (${activeAssignments.length})`
                : `Completed (${completedAssignments.length})`}
            </button>
          ))}
        </div>

        {/* Pipeline Overview */}
        <div className="mb-10 p-6 rounded-lg border border-white/5 bg-white/[0.02]">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Pipeline Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PIPELINE_STAGES.map((stage) => {
              const count = assignments.filter((a) => a.status === stage).length
              return (
                <div key={stage} className="text-center">
                  <div className="text-2xl font-bold text-white">{count}</div>
                  <div
                    className={`text-xs mt-1 ${
                      stage === 'Accepted' ? 'text-accent' : 'text-gray-500'
                    }`}
                  >
                    {stage}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Assignment Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayed.map((assignment) => (
            <div
              key={assignment.id}
              className="group p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-gray-500 font-mono">{assignment.id}</span>
                  <h3 className="text-lg font-semibold mt-1">{assignment.projectName}</h3>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    STATUS_COLORS[assignment.status] || 'text-gray-400 bg-white/5'
                  }`}
                >
                  {assignment.status}
                </span>
              </div>

              {/* Card Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Role</span>
                  <span className="text-white">{assignment.role}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Deliverable</span>
                  <span className="text-white text-right max-w-[60%]">
                    {assignment.deliverable}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Jurisdiction</span>
                  <span className="text-white">{assignment.jurisdiction}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Legal Basis</span>
                  <span className="text-white font-mono text-xs">{assignment.legalBasis}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Deadline</span>
                  <span className="text-white">{assignment.deadline}</span>
                </div>
              </div>

              {/* Status Pipeline Visual */}
              <div className="flex items-center gap-1 mb-6">
                {PIPELINE_STAGES.map((stage, i) => {
                  const stageIndex = PIPELINE_STAGES.indexOf(assignment.status)
                  const isComplete = i <= stageIndex
                  return (
                    <div
                      key={stage}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        isComplete ? 'bg-accent' : 'bg-white/10'
                      }`}
                    />
                  )
                })}
              </div>

              {/* Upload Area */}
              {(assignment.status === 'Assigned' || assignment.status === 'In Progress') && (
                <div className="border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-accent/30 transition-colors">
                  {uploadStatus[assignment.id] === 'uploading' ? (
                    <p className="text-sm text-gray-400">Uploading...</p>
                  ) : uploadStatus[assignment.id] === 'uploaded' ? (
                    <p className="text-sm text-accent">Deliverable submitted</p>
                  ) : (
                    <button
                      onClick={() => handleUpload(assignment.id)}
                      className="text-sm text-gray-400 hover:text-accent transition-colors"
                    >
                      Upload signed deliverable (PDF)
                    </button>
                  )}
                </div>
              )}

              {/* Uploaded File Display */}
              {assignment.uploadedFile && (
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
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
          <div className="text-center py-16 text-gray-500">
            <p>No {activeTab} assignments.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default VendorPortal
