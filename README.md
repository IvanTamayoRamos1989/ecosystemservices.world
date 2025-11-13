# Regenerative Infrastructure Solutions Archive

This project provides a secure two-part web application for researching and archiving regenerative infrastructure solutions. It comprises a Python Flask backend AI agent and a React frontend interface.

## Prerequisites

- Python 3.10 or later
- Node.js 18 or later (includes npm)
- A valid Google Gemini API key with access to the `gemini-1.5-flash` and `gemini-1.5-pro` models and Google Search tool

## Backend Setup (`backend/agent_analyzer.py`)

1. Create a virtual environment (recommended) and activate it:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure environment variables. Set at least `GEMINI_API_KEY`. Optionally configure `ALLOWED_ORIGINS` (comma-separated list, defaults to `*`) and `PORT` (defaults to `5000`). You can place them in a `.env` file:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env
   ```
4. Start the Flask server:
   ```bash
   python agent_analyzer.py
   ```
   The server listens on `http://127.0.0.1:5000` by default.

## Frontend Setup (React with Vite)

1. In a separate terminal, install frontend dependencies from the project root:
   ```bash
   cd /workspace
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal (typically `http://127.0.0.1:5173`). All requests to `/api/*` are proxied to the Flask backend, so ensure the backend is running before analyzing any company.

## Usage Workflow

1. Launch the backend and frontend in separate terminals as described above.
2. In the frontend UI, enter the company/project name and a supporting source URL.
3. Click **[ANALYZE & ARCHIVE]**. The status indicator will show progress.
4. Once complete, the analysis appears in the archive list. Download the structured results as Markdown or JSON for record-keeping.

## Security Notes

- The Gemini API key is loaded exclusively on the server. The frontend never handles or exposes API credentials.
- Use HTTPS and restrictive `ALLOWED_ORIGINS` values in production deployments.

