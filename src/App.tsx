import React, { useState } from 'react';

// Types
interface Solution {
  solutionName: string;
  category: string;
  location: string;
  completionDate: string;
  engineeringSpecifications: {
    technicalDescription: string;
    designParameters: string;
    performance: string;
    construction: string;
    maintenance: string;
  };
  environmentalImpact: {
    baseline: string;
    waterQuality: string;
    carbonImpact: string;
    biodiversity: string;
    certifications: string;
  };
  financialAnalysis: {
    capitalCost: string;
    operatingCost: string;
    financialReturns: string;
    financingStructure: string;
  };
  socialImpact: {
    riskMitigation: string;
    opportunityCreation: string;
    equityAssessment: string;
  };
  implementationReplicability: {
    timeline: string;
    stakeholders: string;
    barriers: string;
    successFactors: string;
    lessonsLearned: string;
  };
  evidenceDataQuality: {
    dataCompleteness: string;
    verification: string;
    confidence: string;
    sources: string;
    dataGaps: string;
  };
  keyMetricsMetadata: {
    sustainabilityKPIs: string;
    sdgAlignment: string;
    innovationLevel: string;
    trl: string;
    replicationPotential: string;
  };
}

interface Source {
  uri: string;
  title: string;
}

interface AnalysisResult {
  solutions: Solution[];
  sources: Source[];
}

interface ArchivedEntry {
  companyName: string;
  result: AnalysisResult;
  timestamp: string;
}

// Hook for analysis
const useAnalysis = () => {
  const analyze = async (companyName: string, sourceUrl: string): Promise<AnalysisResult> => {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName, sourceUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Analysis failed');
    }

    return await response.json();
  };

  return { analyze };
};

// Main App Component
function App() {
  const [companyName, setCompanyName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [status, setStatus] = useState('Idle.');
  const [archive, setArchive] = useState<ArchivedEntry[]>([]);
  const { analyze } = useAnalysis();

  const handleAnalyze = async () => {
    if (!companyName.trim() || !sourceUrl.trim()) {
      setStatus('Error: Both fields are required.');
      return;
    }

    try {
      setStatus('Initializing...');
      const result = await analyze(companyName, sourceUrl);
      setStatus('Complete!');

      const newEntry: ArchivedEntry = {
        companyName,
        result,
        timestamp: new Date().toISOString(),
      };

      setArchive([newEntry, ...archive]);
      setCompanyName('');
      setSourceUrl('');

      setTimeout(() => setStatus('Idle.'), 2000);
    } catch (error) {
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  const generateMarkdown = (entry: ArchivedEntry): string => {
    let md = `# ${entry.companyName} - Regenerative Infrastructure Solutions\n\n`;
    md += `**Analysis Date:** ${new Date(entry.timestamp).toLocaleString()}\n\n`;
    md += `**Total Solutions:** ${entry.result.solutions.length}\n\n`;
    
    // AI-Discovered Sources section
    md += `## AI-Discovered Sources\n\n`;
    if (entry.result.sources && entry.result.sources.length > 0) {
      entry.result.sources.forEach((source, idx) => {
        md += `${idx + 1}. [${source.title}](${source.uri})\n`;
      });
    } else {
      md += `No sources available.\n`;
    }
    md += `\n---\n\n`;

    // Solutions
    entry.result.solutions.forEach((solution, idx) => {
      md += `## Solution ${idx + 1}: ${solution.solutionName}\n\n`;
      md += `**Category:** ${solution.category}\n`;
      md += `**Location:** ${solution.location}\n`;
      md += `**Completion Date:** ${solution.completionDate}\n\n`;

      md += `### Engineering Specifications\n`;
      md += `- **Technical Description:** ${solution.engineeringSpecifications.technicalDescription}\n`;
      md += `- **Design Parameters:** ${solution.engineeringSpecifications.designParameters}\n`;
      md += `- **Performance:** ${solution.engineeringSpecifications.performance}\n`;
      md += `- **Construction:** ${solution.engineeringSpecifications.construction}\n`;
      md += `- **Maintenance:** ${solution.engineeringSpecifications.maintenance}\n\n`;

      md += `### Environmental Impact\n`;
      md += `- **Baseline:** ${solution.environmentalImpact.baseline}\n`;
      md += `- **Water Quality:** ${solution.environmentalImpact.waterQuality}\n`;
      md += `- **Carbon Impact:** ${solution.environmentalImpact.carbonImpact}\n`;
      md += `- **Biodiversity:** ${solution.environmentalImpact.biodiversity}\n`;
      md += `- **Certifications:** ${solution.environmentalImpact.certifications}\n\n`;

      md += `### Financial Analysis\n`;
      md += `- **Capital Cost:** ${solution.financialAnalysis.capitalCost}\n`;
      md += `- **Operating Cost:** ${solution.financialAnalysis.operatingCost}\n`;
      md += `- **Financial Returns:** ${solution.financialAnalysis.financialReturns}\n`;
      md += `- **Financing Structure:** ${solution.financialAnalysis.financingStructure}\n\n`;

      md += `### Social Impact\n`;
      md += `- **Risk Mitigation:** ${solution.socialImpact.riskMitigation}\n`;
      md += `- **Opportunity Creation:** ${solution.socialImpact.opportunityCreation}\n`;
      md += `- **Equity Assessment:** ${solution.socialImpact.equityAssessment}\n\n`;

      md += `### Implementation & Replicability\n`;
      md += `- **Timeline:** ${solution.implementationReplicability.timeline}\n`;
      md += `- **Stakeholders:** ${solution.implementationReplicability.stakeholders}\n`;
      md += `- **Barriers:** ${solution.implementationReplicability.barriers}\n`;
      md += `- **Success Factors:** ${solution.implementationReplicability.successFactors}\n`;
      md += `- **Lessons Learned:** ${solution.implementationReplicability.lessonsLearned}\n\n`;

      md += `### Evidence & Data Quality\n`;
      md += `- **Data Completeness:** ${solution.evidenceDataQuality.dataCompleteness}\n`;
      md += `- **Verification:** ${solution.evidenceDataQuality.verification}\n`;
      md += `- **Confidence:** ${solution.evidenceDataQuality.confidence}\n`;
      md += `- **Sources:** ${solution.evidenceDataQuality.sources}\n`;
      md += `- **Data Gaps:** ${solution.evidenceDataQuality.dataGaps}\n\n`;

      md += `### Key Metrics & Metadata\n`;
      md += `- **Sustainability KPIs:** ${solution.keyMetricsMetadata.sustainabilityKPIs}\n`;
      md += `- **SDG Alignment:** ${solution.keyMetricsMetadata.sdgAlignment}\n`;
      md += `- **Innovation Level:** ${solution.keyMetricsMetadata.innovationLevel}\n`;
      md += `- **TRL:** ${solution.keyMetricsMetadata.trl}\n`;
      md += `- **Replication Potential:** ${solution.keyMetricsMetadata.replicationPotential}\n\n`;

      md += `---\n\n`;
    });

    return md;
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = (entry: ArchivedEntry) => {
    const markdown = generateMarkdown(entry);
    const filename = `${entry.companyName.replace(/\s+/g, '_')}_solutions.md`;
    downloadFile(markdown, filename, 'text/markdown');
  };

  const handleDownloadJSON = (entry: ArchivedEntry) => {
    const json = JSON.stringify(entry.result, null, 2);
    const filename = `${entry.companyName.replace(/\s+/g, '_')}_solutions.json`;
    downloadFile(json, filename, 'application/json');
  };

  const totalCompanies = archive.length;
  const totalSolutions = archive.reduce((sum, entry) => sum + entry.result.solutions.length, 0);

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontFamily: 'monospace',
      minHeight: '100vh',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #FFFFFF',
        padding: '20px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '10px' }}>
          REGENERATIVE INFRASTRUCTURE SOLUTIONS ARCHIVE
        </div>
        <div style={{ borderBottom: '1px solid #FFFFFF', marginBottom: '15px' }}></div>

        {/* Stats */}
        <div style={{ marginBottom: '15px' }}>
          STATS: {totalCompanies} Companies | {totalSolutions} Solutions
        </div>

        {/* Input Form */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '5px' }}>ENTER PROJECT/COMPANY NAME:</div>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '8px',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ marginBottom: '5px' }}>ENTER SOURCE URL (SUSTAINABILITY/PROJECT PAGE):</div>
          <input
            type="text"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #FFFFFF',
              padding: '8px',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '1px solid #FFFFFF',
            padding: '10px 20px',
            fontFamily: 'monospace',
            cursor: 'pointer',
            marginBottom: '15px',
          }}
        >
          [ANALYZE & ARCHIVE]
        </button>

        {/* Status */}
        <div style={{ marginBottom: '15px' }}>
          STATUS: {status}
        </div>

        <div style={{ borderBottom: '1px solid #FFFFFF', marginBottom: '15px' }}></div>

        {/* Archive */}
        <div style={{ marginBottom: '10px' }}>ARCHIVE:</div>

        {archive.length === 0 ? (
          <div style={{ marginTop: '10px' }}>No entries yet.</div>
        ) : (
          <div>
            {archive.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  {entry.companyName} ({entry.result.solutions.length} solutions)
                </span>
                <div>
                  <button
                    onClick={() => handleDownloadMarkdown(entry)}
                    style={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid #FFFFFF',
                      padding: '5px 10px',
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  >
                    [DOWNLOAD .MD]
                  </button>
                  <button
                    onClick={() => handleDownloadJSON(entry)}
                    style={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid #FFFFFF',
                      padding: '5px 10px',
                      fontFamily: 'monospace',
                      cursor: 'pointer',
                    }}
                  >
                    [DOWNLOAD .JSON]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
