import { FormEvent, useCallback, useMemo, useState } from "react";

type AnalysisRequest = {
  companyName: string;
  sourceUrl: string;
};

type Source = {
  uri: string;
  title: string;
  snippet: string;
};

type SolutionFieldGroup = {
  technicalDescription?: string;
  designParameters?: string;
  performance?: string;
  construction?: string;
  maintenance?: string;
  baseline?: string;
  waterQuality?: string;
  carbonImpact?: string;
  biodiversity?: string;
  certifications?: string;
  capitalCost?: string;
  operatingCost?: string;
  financialReturns?: string;
  financingStructure?: string;
  riskMitigation?: string;
  opportunityCreation?: string;
  equityAssessment?: string;
  timeline?: string;
  stakeholders?: string;
  barriers?: string;
  successFactors?: string;
  lessonsLearned?: string;
  dataCompleteness?: string;
  verification?: string;
  confidence?: string;
  sources?: string;
  dataGaps?: string;
  sustainabilityKPIs?: string;
  sdgAlignment?: string;
  innovationLevel?: string;
  trl?: string;
  replicationPotential?: string;
};

type Solution = {
  solutionName?: string;
  category?: string;
  location?: string;
  completionDate?: string;
  engineeringSpecifications?: SolutionFieldGroup;
  environmentalImpact?: SolutionFieldGroup;
  financialAnalysis?: SolutionFieldGroup;
  socialImpact?: SolutionFieldGroup;
  implementationReplicability?: SolutionFieldGroup;
  evidenceDataQuality?: SolutionFieldGroup;
  keyMetricsMetadata?: SolutionFieldGroup;
};

type AnalysisResponse = {
  solutions: Solution[];
  sources: Source[];
};

type ArchiveEntry = {
  id: string;
  companyName: string;
  sourceUrl: string;
  analyzedAt: string;
  payload: AnalysisResponse;
};

const useAnalysis = () => {
  const analyze = useCallback(
    async (payload: AnalysisRequest): Promise<AnalysisResponse> => {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Unknown server error.";
        try {
          const errorPayload = await response.json();
          message = errorPayload.error ?? message;
        } catch {
          message = `${response.status} ${response.statusText}`;
        }
        throw new Error(message);
      }

      const data = (await response.json()) as AnalysisResponse;
      return {
        solutions: Array.isArray(data.solutions) ? data.solutions : [],
        sources: Array.isArray(data.sources) ? data.sources : [],
      };
    },
    []
  );

  return { analyze };
};

const formatField = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "Data not available in source";
};

const buildMarkdownReport = (
  entry: ArchiveEntry,
  index: number
): { filename: string; content: string } => {
  const header = [
    "# Regenerative Infrastructure Solutions Report",
    `- Company/Project: ${entry.companyName}`,
    `- Source URL: ${entry.sourceUrl}`,
    `- Archived On: ${entry.analyzedAt}`,
    "",
    "### AI-Discovered Sources",
  ];

  const sourcesSection =
    entry.payload.sources.length === 0
      ? ["- Data not available in source"]
      : entry.payload.sources.map((source, idx) => {
          const title = formatField(source.title);
          const snippet = formatField(source.snippet);
          const uri = formatField(source.uri);
          return `- Source ${idx + 1}: ${title}\n  - URL: ${uri}\n  - Extract: ${snippet}`;
        });

  const solutionsSection =
    entry.payload.solutions.length === 0
      ? ["\n### No solutions were returned by the AI agent."]
      : entry.payload.solutions.map((solution, idx) => {
          const lines: string[] = [];
          lines.push("");
          lines.push(`### Solution ${idx + 1}: ${formatField(solution.solutionName)}`);
          lines.push(`- Category: ${formatField(solution.category)}`);
          lines.push(`- Location: ${formatField(solution.location)}`);
          lines.push(`- Completion Date: ${formatField(solution.completionDate)}`);

          const engineering = solution.engineeringSpecifications ?? {};
          lines.push("");
          lines.push("#### Engineering Specifications");
          lines.push(`- Technical Description: ${formatField(engineering.technicalDescription)}`);
          lines.push(`- Design Parameters: ${formatField(engineering.designParameters)}`);
          lines.push(`- Performance: ${formatField(engineering.performance)}`);
          lines.push(`- Construction: ${formatField(engineering.construction)}`);
          lines.push(`- Maintenance: ${formatField(engineering.maintenance)}`);

          const environmental = solution.environmentalImpact ?? {};
          lines.push("");
          lines.push("#### Environmental Impact");
          lines.push(`- Baseline: ${formatField(environmental.baseline)}`);
          lines.push(`- Water Quality: ${formatField(environmental.waterQuality)}`);
          lines.push(`- Carbon Impact: ${formatField(environmental.carbonImpact)}`);
          lines.push(`- Biodiversity: ${formatField(environmental.biodiversity)}`);
          lines.push(`- Certifications: ${formatField(environmental.certifications)}`);

          const financial = solution.financialAnalysis ?? {};
          lines.push("");
          lines.push("#### Financial Analysis");
          lines.push(`- Capital Cost: ${formatField(financial.capitalCost)}`);
          lines.push(`- Operating Cost: ${formatField(financial.operatingCost)}`);
          lines.push(`- Financial Returns: ${formatField(financial.financialReturns)}`);
          lines.push(`- Financing Structure: ${formatField(financial.financingStructure)}`);

          const social = solution.socialImpact ?? {};
          lines.push("");
          lines.push("#### Social Impact");
          lines.push(`- Risk Mitigation: ${formatField(social.riskMitigation)}`);
          lines.push(`- Opportunity Creation: ${formatField(social.opportunityCreation)}`);
          lines.push(`- Equity Assessment: ${formatField(social.equityAssessment)}`);

          const replicability = solution.implementationReplicability ?? {};
          lines.push("");
          lines.push("#### Implementation & Replicability");
          lines.push(`- Timeline: ${formatField(replicability.timeline)}`);
          lines.push(`- Stakeholders: ${formatField(replicability.stakeholders)}`);
          lines.push(`- Barriers: ${formatField(replicability.barriers)}`);
          lines.push(`- Success Factors: ${formatField(replicability.successFactors)}`);
          lines.push(`- Lessons Learned: ${formatField(replicability.lessonsLearned)}`);

          const evidence = solution.evidenceDataQuality ?? {};
          lines.push("");
          lines.push("#### Evidence & Data Quality");
          lines.push(`- Data Completeness: ${formatField(evidence.dataCompleteness)}`);
          lines.push(`- Verification: ${formatField(evidence.verification)}`);
          lines.push(`- Confidence: ${formatField(evidence.confidence)}`);
          lines.push(`- Sources: ${formatField(evidence.sources)}`);
          lines.push(`- Data Gaps: ${formatField(evidence.dataGaps)}`);

          const metrics = solution.keyMetricsMetadata ?? {};
          lines.push("");
          lines.push("#### Key Metrics Metadata");
          lines.push(`- Sustainability KPIs: ${formatField(metrics.sustainabilityKPIs)}`);
          lines.push(`- SDG Alignment: ${formatField(metrics.sdgAlignment)}`);
          lines.push(`- Innovation Level: ${formatField(metrics.innovationLevel)}`);
          lines.push(`- TRL: ${formatField(metrics.trl)}`);
          lines.push(`- Replication Potential: ${formatField(metrics.replicationPotential)}`);

          return lines.join("\n");
        });

  const document = [...header, ...sourcesSection, ...solutionsSection].join("\n");
  const sanitizedCompany = entry.companyName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || `archive-${index + 1}`;
  const filename = `${sanitizedCompany}-analysis.md`;
  return { filename, content: document };
};

const downloadFile = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

const App = () => {
  const { analyze } = useAnalysis();
  const [companyName, setCompanyName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("Idle.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [archive, setArchive] = useState<ArchiveEntry[]>([]);

  const stats = useMemo(() => {
    const companies = archive.length;
    const solutions = archive.reduce((total, entry) => total + entry.payload.solutions.length, 0);
    return { companies, solutions };
  }, [archive]);

  const handleAnalyze = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isAnalyzing) {
        return;
      }

      const trimmedCompany = companyName.trim();
      const trimmedUrl = sourceUrl.trim();
      if (!trimmedCompany || !trimmedUrl) {
        setStatusMessage("Error: Please provide both company/project name and source URL.");
        return;
      }

      setIsAnalyzing(true);
      setStatusMessage("Initializing...");

      try {
        const payload: AnalysisRequest = {
          companyName: trimmedCompany,
          sourceUrl: trimmedUrl,
        };
        const response = await analyze(payload);
        const timestamp = new Date().toISOString();
        const entry: ArchiveEntry = {
          id: `${timestamp}-${Math.random().toString(36).slice(2)}`,
          companyName: trimmedCompany,
          sourceUrl: trimmedUrl,
          analyzedAt: timestamp,
          payload: response,
        };
        setArchive((prev) => [entry, ...prev]);
        setStatusMessage("Complete!");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error.";
        setStatusMessage(`Error: ${message}`);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [analyze, companyName, isAnalyzing, sourceUrl]
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-4xl border border-white p-6 md:p-10">
        <header>
          <h1 className="text-xl md:text-2xl tracking-widest">
            REGENERATIVE INFRASTRUCTURE SOLUTIONS ARCHIVE
          </h1>
          <div className="mt-2 border-t border-white" />
          <p className="mt-2">[STATS: {stats.companies} Companies | {stats.solutions} Solutions]</p>
        </header>

        <form onSubmit={handleAnalyze} className="mt-6 space-y-6">
          <div>
            <label className="block mb-2">ENTER PROJECT/COMPANY NAME:</label>
            <input
              className="w-full bg-black border border-white px-3 py-2 text-white focus:outline-none"
              value={companyName}
              autoComplete="off"
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2">ENTER SOURCE URL (SUSTAINABILITY/PROJECT PAGE):</label>
            <input
              className="w-full bg-black border border-white px-3 py-2 text-white focus:outline-none"
              value={sourceUrl}
              autoComplete="off"
              onChange={(event) => setSourceUrl(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full border border-white px-4 py-2 text-left hover:bg-white hover:text-black transition-colors disabled:opacity-60 disabled:hover:bg-black disabled:hover:text-white"
            disabled={isAnalyzing}
          >
            [ANALYZE & ARCHIVE]
          </button>
        </form>

        <section className="mt-6">
          <p>STATUS: {statusMessage}</p>
          <div className="mt-4 border-t border-white" />
        </section>

        <section className="mt-6">
          <h2 className="mb-4 tracking-widest">ARCHIVE:</h2>
          {archive.length === 0 ? (
            <p>No analyses stored yet.</p>
          ) : (
            <ul className="space-y-4">
              {archive.map((entry, idx) => {
                const solutionsCount = entry.payload.solutions.length;
                const markdown = buildMarkdownReport(entry, idx);
                const jsonFilename =
                  `${entry.companyName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || `archive-${idx + 1}`}-analysis.json`;

                return (
                  <li key={entry.id} className="border border-white p-4 md:flex md:items-center md:justify-between gap-4">
                    <div className="mb-4 md:mb-0">
                      <p>
                        {entry.companyName} ({solutionsCount} {solutionsCount === 1 ? "solution" : "solutions"})
                      </p>
                      <p className="text-xs mt-1">Archived: {entry.analyzedAt}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        className="border border-white px-3 py-2 text-left hover:bg-white hover:text-black transition-colors"
                        onClick={() =>
                          downloadFile(jsonFilename, JSON.stringify(entry.payload, null, 2), "application/json")
                        }
                      >
                        [DOWNLOAD .JSON]
                      </button>
                      <button
                        className="border border-white px-3 py-2 text-left hover:bg-white hover:text-black transition-colors"
                        onClick={() => downloadFile(markdown.filename, markdown.content, "text/markdown")}
                      >
                        [DOWNLOAD .MD]
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
