from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="CrashIQ ML Service")

# Load model on startup
MODEL_PATH = os.getenv("MODEL_PATH", "model.joblib")
model_data = None

def load_model():
    global model_data
    if os.path.exists(MODEL_PATH):
        model_data = joblib.load(MODEL_PATH)
        print(f"✅ Model loaded from {MODEL_PATH}")
    else:
        print(f"⚠️  No model found at {MODEL_PATH} — run train.py first")

load_model()

class PredictionInput(BaseModel):
    weather: str
    timeOfDay: str       # 'day' or 'night'
    roadType: str
    speedLimit: int
    country: str         # 'UK' or 'US'
    roadSurface: str = "dry"
    urbanOrRural: str = "urban"
    dayOfWeek: int = 4   # 1=Mon, 7=Sun

class PredictionOutput(BaseModel):
    riskLevel: str       # low / medium / high
    riskScore: float     # 0.0 - 1.0
    confidence: float
    topFactors: list[str]

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "crashiq-ml",
        "modelLoaded": model_data is not None
    }

@app.post("/predict", response_model=PredictionOutput)
def predict(data: PredictionInput):
    if model_data is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Run train.py first.")

    model = model_data["model"]
    encoders = model_data["encoders"]
    features = model_data["features"]

    # Map incoming request to training feature format
    def safe_encode(encoder, value: str) -> int:
        """Encode a value, defaulting to 0 if unseen."""
        try:
            return encoder.transform([value.lower()])[0]
        except ValueError:
            return 0

    light = "daylight" if data.timeOfDay == "day" else "darkness lights lit"

    feature_values = {
        "weather":      safe_encode(encoders["weather"], data.weather),
        "road_type":    safe_encode(encoders["road_type"], data.roadType),
        "speed_limit":  float(data.speedLimit),
        "light":        safe_encode(encoders["light"], light),
        "road_surface": safe_encode(encoders["road_surface"], data.roadSurface),
        "urban_rural":  safe_encode(encoders["urban_rural"], data.urbanOrRural),
        "day_of_week":  float(data.dayOfWeek),
        "country":      safe_encode(encoders["country"], data.country),
    }

    X = np.array([[feature_values[f] for f in features]])

    # Get prediction and probabilities
    prediction = model.predict(X)[0]
    probabilities = model.predict_proba(X)[0]
    confidence = float(np.max(probabilities))

    risk_label = encoders["risk"].inverse_transform([prediction])[0]

    # Map risk label to 0-1 score
    risk_score_map = {"low": 0.2, "medium": 0.55, "high": 0.9}
    risk_score = risk_score_map.get(risk_label, 0.5)

    # Top contributing factors (features with highest importance)
    importances = model.feature_importances_
    top_indices = np.argsort(importances)[::-1][:3]
    top_factors = [features[i].replace("_", " ") for i in top_indices]

    return PredictionOutput(
        riskLevel=risk_label,
        riskScore=risk_score,
        confidence=round(confidence, 3),
        topFactors=top_factors,
    )