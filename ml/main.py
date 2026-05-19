from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="CrashIQ ML Service")

class PredictionInput(BaseModel):
    weather: str
    timeOfDay: str
    roadType: str
    speedLimit: int
    country: str

class PredictionOutput(BaseModel):
    riskLevel: str
    riskScore: float
    confidence: float

@app.get("/health")
def health():
    return {"status": "ok", "service": "crashiq-ml"}

@app.post("/predict", response_model=PredictionOutput)
def predict(data: PredictionInput):
    # Placeholder until Phase 2 model is trained
    return PredictionOutput(riskLevel="medium", riskScore=0.5, confidence=0.0)
