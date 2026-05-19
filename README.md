# CrashIQ 🚨

A full-stack road accident analytics and risk prediction dashboard using real global data.

## Features
- 🗺️ Interactive global accident hotspot map
- 📊 Trend charts by weather, time, vehicle type
- 🔮 Risk prediction based on road conditions
- 🌍 Data from UK STATS19, WHO, NHTSA datasets

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Leaflet.js, Recharts |
| Backend | Node.js, Express, TypeScript |
| ML Service | Python, FastAPI, Scikit-learn |
| Database | PostgreSQL |
| DevOps | Docker Compose, GitHub Actions |

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+

### Run locally
```bash
git clone https://github.com/ConstantinoCristian/crashiq
cd crashiq
cp .env.example .env
docker compose up
```

App runs at `http://localhost:3000`  
API runs at `http://localhost:5000`  
ML service runs at `http://localhost:8000`

## Architecture

```
crashiq/
├── frontend/     # React + TypeScript
├── backend/      # Node.js + Express
├── ml/           # Python FastAPI + Scikit-learn
├── data/         # Raw datasets (gitignored)
└── docker-compose.yml
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/accidents | Paginated accident records |
| GET | /api/accidents/hotspots | Clustered map data |
| GET | /api/stats | Aggregated statistics |
| POST | /api/predict | Risk prediction |

## Testing
```bash
cd backend && npm test
```

## License
MIT
