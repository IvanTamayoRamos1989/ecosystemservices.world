# agent-3-analyzer/main.py
import os
import sys
from flask import Flask, request, jsonify
import vertexai
from vertexai.generative_models import GenerativeModel

app = Flask(__name__)

# Initialize Vertex AI
PROJECT_ID = os.environ.get("GCP_PROJECT", "regent-477315")
LOCATION = "us-central1"

vertexai.init(project=PROJECT_ID, location=LOCATION)

# Load the prompt from your .md file
try:
    with open("regenerative_infrastructure_prompt.md", "r") as f:
        ANALYSIS_PROMPT = f.read()
except FileNotFoundError:
    print("ERROR: regenerative_infrastructure_prompt.md not found", file=sys.stderr)
    ANALYSIS_PROMPT = "Analyze the following ESG and sustainability information:"

# Initialize the Gemini model
model = GenerativeModel("gemini-1.5-flash")

@app.route("/", methods=['POST'])
def analyze_data():
    """
    This endpoint will be called by the workflow.
    It expects JSON like: {"scraped_text": "..."}
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        scraped_text = data.get('scraped_text')
        if not scraped_text:
            return jsonify({"error": "Missing 'scraped_text' in request"}), 400

        # Check if scraped text is meaningful (not just error pages)
        if len(scraped_text) < 100:
            return jsonify({
                "analysis": f"Insufficient data to analyze. Scraped text too short ({len(scraped_text)} characters).",
                "status": "insufficient_data"
            }), 200

        # Check for common error indicators
        error_keywords = ["404", "not found", "page not found", "error"]
        if any(keyword in scraped_text.lower()[:200] for keyword in error_keywords):
            return jsonify({
                "analysis": "The webpage appears to be an error page (404 or similar). No meaningful content to analyze.",
                "status": "error_page"
            }), 200

        print(f"Analyzing text of length: {len(scraped_text)} characters")

        # Combine the analysis prompt with the scraped text
        full_prompt = f"{ANALYSIS_PROMPT}\n\n--- SCRAPED CONTENT ---\n{scraped_text[:50000]}"  # Limit to 50k chars

        # Call Vertex AI Gemini for real analysis
        response = model.generate_content(
            full_prompt,
            generation_config={
                "max_output_tokens": 2048,
                "temperature": 0.3,
                "top_p": 0.8,
            }
        )

        final_analysis = response.text

        print(f"Analysis completed. Response length: {len(final_analysis)} characters")

        return jsonify({
            "analysis": final_analysis,
            "status": "success"
        }), 200

    except Exception as e:
        print(f"Error during analysis: {e}", file=sys.stderr)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, 
            host="0.0.0.0", 
            port=int(os.environ.get("PORT", 8080)))
