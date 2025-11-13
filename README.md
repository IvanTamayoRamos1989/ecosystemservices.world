# Regenerative Infrastructure Solutions Archive

A secure, two-part web application that analyzes regenerative infrastructure solutions using AI. The system consists of a React frontend and a Python Flask backend with Gemini AI integration.

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Python Flask + Google Gemini AI
- **Security**: API keys are stored server-side only; the frontend never handles credentials

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- Google Gemini API key

## Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Gemini API key:

```
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 2. Frontend Setup

From the root directory, install frontend dependencies:

```bash
npm install
```

If TypeScript support is needed, install these additional packages:

```bash
npm install --save-dev @vitejs/plugin-react typescript @types/react @types/react-dom
```

## Running the Application

You need to run both the backend and frontend in separate terminals.

### Terminal 1: Start the Backend Server

```bash
cd backend
python agent_analyzer.py
```

The backend will start on `http://127.0.0.1:5000`

### Terminal 2: Start the Frontend Development Server

From the root directory:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or similar, check the terminal output)

## Usage

1. Open the frontend URL in your browser
2. Enter a company/project name (e.g., "Acciona")
3. Enter a source URL (sustainability report or project page)
4. Click **[ANALYZE & ARCHIVE]**
5. Wait for the AI analysis to complete (this may take 30-60 seconds)
6. View results in the archive section
7. Download results as Markdown (.md) or JSON (.json) files

## Features

- **Two-Step AI Analysis**:
  - Step 1: Deep-dive research using Gemini 1.5 Flash with Google Search
  - Step 2: Structured data extraction using Gemini 1.5 Pro with JSON schema
- **Secure Architecture**: API keys never exposed to the frontend
- **Archive System**: Store and manage multiple analysis results
- **File Export**: Download results as Markdown reports or raw JSON
- **Source Attribution**: AI-discovered sources are included in all reports

## File Structure

```
/workspace/
├── backend/
│   ├── agent_analyzer.py       # Flask server with AI analysis
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Example environment file
│   └── .env                   # Your actual API key (not in git)
├── src/
│   ├── App.tsx                # Main React application
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── vite.config.ts            # Vite configuration with proxy
├── package.json              # Node dependencies
└── README.md                 # This file
```

## API Endpoint

### POST /api/analyze

Request body:
```json
{
  "companyName": "Company Name",
  "sourceUrl": "https://example.com/sustainability"
}
```

Response:
```json
{
  "solutions": [...],
  "sources": [...]
}
```

## Security Notes

- Never commit the `.env` file to version control
- The Gemini API key is only stored on the backend server
- The frontend communicates with the backend through a secure proxy
- All API requests are validated server-side

## Troubleshooting

**CORS Errors**: Make sure both servers are running and the Vite proxy is configured correctly in `vite.config.ts`

**API Key Errors**: Verify your `.env` file exists in the `backend` directory and contains a valid `GEMINI_API_KEY`

**Module Not Found**: Ensure all dependencies are installed:
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

## License

MIT
