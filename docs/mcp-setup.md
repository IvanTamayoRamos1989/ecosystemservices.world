# MCP Server Setup Guide

> Connect Google services to the ESW multi-agent system via Model Context Protocol (MCP).

## Overview

MCP servers expose external tools (Google Maps, Gemini, Earth Engine) to Claude Code sessions. When enabled, agents like the GIS Analyst and Eco-Scientist can invoke these tools directly during analysis.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed
- Google Cloud account with billing enabled

---

## 1. Gemini (Multi-Model AI)

Gives agents access to Google's Gemini model for cross-model verification and alternative analysis.

### Get your API key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click **Create API key**
3. Copy the key

### Activate

```bash
# Set the environment variable
export GEMINI_API_KEY="your-key-here"
```

Then edit `.mcp.json` — set `"disabled": false` for the `gemini` server.

### Available tools

| Tool | Description |
|---|---|
| `gemini_chat` | Send a prompt to Gemini and receive a response |
| `gemini_analyze_image` | Analyze images with Gemini's vision capabilities |

---

## 2. Google Maps

Gives the GIS Analyst geocoding, directions, elevation data, and place search.

### Get your API key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
   - Elevation API
   - Directions API
4. Create an API key under **Credentials**
5. Restrict the key to the APIs above (recommended)

### Activate

```bash
export GOOGLE_MAPS_API_KEY="your-key-here"
```

Then edit `.mcp.json` — set `"disabled": false` for the `google-maps` server.

### Available tools

| Tool | Description |
|---|---|
| `maps_geocode` | Convert address to coordinates |
| `maps_reverse_geocode` | Convert coordinates to address |
| `maps_search_places` | Search for places near a location |
| `maps_place_details` | Get detailed info about a specific place |
| `maps_distance_matrix` | Calculate distances between locations |
| `maps_elevation` | Get elevation data for coordinates |
| `maps_directions` | Get directions between locations |

---

## 3. Google Earth Engine (Advanced)

Gives agents access to satellite imagery, NDVI analysis, land cover data, and time-series analysis. This requires a Google Cloud service account.

### Setup

1. Go to [Google Earth Engine](https://earthengine.google.com/) and register your project
2. Create a service account:
   ```bash
   # In Google Cloud Console
   gcloud iam service-accounts create ee-agent \
     --display-name="Earth Engine Agent"

   # Grant Earth Engine access
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:ee-agent@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/earthengine.viewer"

   # Create and download key
   gcloud iam service-accounts keys create ee-key.json \
     --iam-account=ee-agent@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```
3. Move `ee-key.json` to a secure location (e.g., `~/.config/esw/ee-key.json`)
4. Clone and install the Earth Engine MCP server:
   ```bash
   git clone https://github.com/Dhenenjay/earth-engine-mcp.git ~/mcp-servers/earth-engine
   cd ~/mcp-servers/earth-engine
   npm install
   ```
5. Add to `.mcp.json`:
   ```json
   "earth-engine": {
     "command": "node",
     "args": ["/home/YOUR_USER/mcp-servers/earth-engine/mcp-earth-engine.js"],
     "env": {
       "EARTH_ENGINE_PROJECT": "your-gcp-project-id",
       "GOOGLE_APPLICATION_CREDENTIALS": "/home/YOUR_USER/.config/esw/ee-key.json"
     }
   }
   ```

### Available tools

| Tool | Description |
|---|---|
| `ee_get_ndvi` | Calculate NDVI for a region and time period |
| `ee_land_cover` | Get land cover classification for a region |
| `ee_time_series` | Generate time-series data for a satellite band |
| `ee_get_elevation` | Get elevation data from SRTM |

---

## Security Notes

- **Never commit API keys.** The `.mcp.json` uses `${ENV_VAR}` syntax to read from environment variables.
- **Restrict API keys** to only the APIs needed (Google Cloud Console → Credentials → Edit key).
- **Earth Engine key file** (`ee-key.json`) should never be in the repo. Keep it in `~/.config/esw/` or similar.
- Add to your shell profile (`~/.bashrc` or `~/.zshrc`):
  ```bash
  export GEMINI_API_KEY="..."
  export GOOGLE_MAPS_API_KEY="..."
  export EARTH_ENGINE_PROJECT="..."
  export GOOGLE_APPLICATION_CREDENTIALS="..."
  ```

---

## Verification

After setting environment variables and enabling servers, restart Claude Code and run:

```
/mcp
```

This shows all connected MCP servers and their available tools. Verify that each enabled server shows a green status.

---

## Agent Integration

When MCP servers are active, the following agents can use them:

| Agent | MCP Server | Use Case |
|---|---|---|
| GIS Analyst | Google Maps, Earth Engine | Geocoding, elevation, NDVI, land cover |
| Eco-Scientist | Earth Engine | Vegetation indices, habitat change detection |
| Regen-Architect | Earth Engine, Google Maps | Site accessibility, terrain analysis |
| Brand Voice | Gemini | Cross-model content review |
| All agents | Gemini | Alternative analysis, fact-checking |
