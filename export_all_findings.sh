#!/bin/bash
# Export All Infrastructure Analysis Findings
# Run this in Cloud Shell

set -e

echo "========================================"
echo "  EXPORTING ALL ANALYSIS FINDINGS"
echo "========================================"
echo ""

# Create export directory
EXPORT_DIR="$HOME/infrastructure_analysis_export"
mkdir -p "$EXPORT_DIR"

# Download all JSON files from GCS
echo "1. Downloading all analysis files from Cloud Storage..."
gsutil -m cp gs://regent-477315-analysis-results/*.json "$EXPORT_DIR/"

# Count files
FILE_COUNT=$(ls -1 "$EXPORT_DIR"/*.json 2>/dev/null | wc -l)
echo "   ✓ Downloaded $FILE_COUNT files"
echo ""

# Create consolidated JSON file
echo "2. Creating consolidated JSON file..."
cat > "$EXPORT_DIR/consolidate.py" << 'PYTHON_EOF'
import json
import glob
import os
from datetime import datetime

# Get all JSON files
json_files = sorted(glob.glob("*.json"))

all_companies = []
file_metadata = []

for json_file in json_files:
    with open(json_file, 'r') as f:
        try:
            data = json.load(f)
            # Handle nested arrays from workflow
            if isinstance(data, list):
                for item in data:
                    if isinstance(item, list):
                        all_companies.extend(item)
                    else:
                        all_companies.append(item)
            
            file_metadata.append({
                "filename": json_file,
                "companies_count": len(data),
                "timestamp": os.path.getmtime(json_file)
            })
        except Exception as e:
            print(f"Error reading {json_file}: {e}")

# Create consolidated output
consolidated = {
    "export_date": datetime.now().isoformat(),
    "total_files": len(json_files),
    "total_companies_analyzed": len(all_companies),
    "files": file_metadata,
    "analyses": all_companies
}

# Save consolidated JSON
with open("ALL_FINDINGS_CONSOLIDATED.json", 'w') as f:
    json.dump(consolidated, f, indent=2)

print(f"✓ Consolidated {len(all_companies)} company analyses into ALL_FINDINGS_CONSOLIDATED.json")
PYTHON_EOF

cd "$EXPORT_DIR"
python3 consolidate.py
echo ""

# Create Markdown report
echo "3. Creating Markdown report..."
cat > "$EXPORT_DIR/create_markdown.py" << 'PYTHON_EOF'
import json
from datetime import datetime

# Load consolidated data
with open("ALL_FINDINGS_CONSOLIDATED.json", 'r') as f:
    data = json.load(f)

# Create Markdown report
md = []
md.append("# Infrastructure Companies ESG Analysis Report")
md.append("")
md.append(f"**Generated:** {data['export_date']}")
md.append(f"**Total Companies Analyzed:** {data['total_companies_analyzed']}")
md.append(f"**Total Analysis Files:** {data['total_files']}")
md.append("")
md.append("---")
md.append("")

# Group by company
companies_dict = {}
for analysis in data['analyses']:
    company_name = analysis.get('company', 'Unknown')
    if company_name not in companies_dict:
        companies_dict[company_name] = []
    companies_dict[company_name].append(analysis)

# Write each company
for idx, (company_name, analyses) in enumerate(sorted(companies_dict.items()), 1):
    md.append(f"## {idx}. {company_name}")
    md.append("")
    
    for analysis in analyses:
        url = analysis.get('source_url', 'N/A')
        analysis_text = analysis.get('analysis', 'No analysis available')
        
        md.append(f"**Source URL:** [{url}]({url})")
        md.append("")
        md.append("### Analysis")
        md.append("")
        
        if analysis_text and analysis_text != "null":
            md.append(analysis_text)
        else:
            md.append("*No analysis data available for this company.*")
        
        md.append("")
        md.append("---")
        md.append("")

# Save Markdown
with open("ALL_FINDINGS_REPORT.md", 'w') as f:
    f.write('\n'.join(md))

print(f"✓ Created Markdown report: ALL_FINDINGS_REPORT.md")
PYTHON_EOF

python3 create_markdown.py
echo ""

# Create summary
echo "4. Creating summary statistics..."
cat > "$EXPORT_DIR/SUMMARY.txt" << EOF
=================================================
  INFRASTRUCTURE ANALYSIS EXPORT SUMMARY
=================================================

Export Date: $(date)
Export Location: $EXPORT_DIR

FILES GENERATED:
  ✓ ALL_FINDINGS_CONSOLIDATED.json  - Complete dataset
  ✓ ALL_FINDINGS_REPORT.md          - Human-readable report
  ✓ SUMMARY.txt                      - This file

ORIGINAL FILES: $FILE_COUNT analysis files

=================================================
EOF

echo "✓ Export complete!"
echo ""
echo "========================================"
echo "  EXPORT COMPLETE!"
echo "========================================"
echo ""
echo "Location: $EXPORT_DIR"
echo ""
echo "Generated files:"
echo "  📄 ALL_FINDINGS_CONSOLIDATED.json  - Complete JSON dataset"
echo "  📝 ALL_FINDINGS_REPORT.md          - Markdown report"
echo "  📊 SUMMARY.txt                      - Summary statistics"
echo ""
echo "To view the report:"
echo "  cat $EXPORT_DIR/ALL_FINDINGS_REPORT.md"
echo ""
echo "To download files from Cloud Shell:"
echo "  1. Click ⋮ (menu) → Download file"
echo "  2. Enter path: $EXPORT_DIR/ALL_FINDINGS_CONSOLIDATED.json"
echo "  3. Repeat for ALL_FINDINGS_REPORT.md"
echo ""
echo "Or create a zip file:"
echo "  cd $EXPORT_DIR && zip -r infrastructure_analysis.zip *.json *.md *.txt"
echo "  Then download: $EXPORT_DIR/infrastructure_analysis.zip"
echo ""
echo "========================================"
