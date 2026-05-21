"""
train.py — Train a Random Forest risk prediction model on accident data.
Run with: python train.py
Saves model to: model.joblib
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import joblib
import os

# ── Load data ───────────────────────────────────────────────────────────────

def load_data() -> pd.DataFrame:
    uk_path = "../data/uk_accidents.csv"
    us_path = "../data/us_accidents.csv"

    print("Loading UK data...")
    uk = pd.read_csv(uk_path, low_memory=False)
    uk_clean = pd.DataFrame({
        "severity":        uk["collision_severity"].astype(str),
        "weather":         uk["weather_conditions"].astype(str),
        "road_type":       uk["road_type"].astype(str),
        "speed_limit":     pd.to_numeric(uk["speed_limit"], errors="coerce"),
        "light":           uk["light_conditions"].astype(str),
        "road_surface":    uk["road_surface_conditions"].astype(str),
        "urban_rural":     uk["urban_or_rural_area"].astype(str),
        "day_of_week":     pd.to_numeric(uk["day_of_week"], errors="coerce"),
        "country":         "UK",
    })
    # Map UK severity: 1=fatal, 2=serious, 3=slight → high/medium/low
    uk_clean["risk"] = uk_clean["severity"].map({"1": "high", "2": "medium", "3": "low"})

    print("Loading US data...")
    us = pd.read_csv(us_path, low_memory=False, nrows=200000)
    us_clean = pd.DataFrame({
        "severity":     us["Severity"].astype(str),
        "weather":      us["Weather_Condition"].fillna("unknown").astype(str),
        "road_type":    "unknown",
        "speed_limit":  np.nan,
        "light":        us["Sunrise_Sunset"].fillna("unknown").astype(str),
        "road_surface": "unknown",
        "urban_rural":  "unknown",
        "day_of_week":  pd.to_datetime(us["Start_Time"], errors="coerce").dt.dayofweek + 1,
        "country":      "US",
    })
    # Map US severity: 1-2=low, 3=medium, 4=high
    us_clean["risk"] = us_clean["severity"].map(
        {"1": "low", "2": "low", "3": "medium", "4": "high"}
    )

    df = pd.concat([uk_clean, us_clean], ignore_index=True)
    df = df.dropna(subset=["risk"])
    print(f"Total rows: {len(df):,}")
    return df


# ── Feature engineering ─────────────────────────────────────────────────────

def prepare_features(df: pd.DataFrame):
    features = ["weather", "road_type", "speed_limit", "light",
                "road_surface", "urban_rural", "day_of_week", "country"]

    df = df[features + ["risk"]].copy()
    df["speed_limit"] = df["speed_limit"].fillna(df["speed_limit"].median())
    df["day_of_week"] = df["day_of_week"].fillna(4)  # default Wednesday

    encoders = {}
    categorical = ["weather", "road_type", "light", "road_surface", "urban_rural", "country"]
    for col in categorical:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

    target_encoder = LabelEncoder()
    y = target_encoder.fit_transform(df["risk"])
    encoders["risk"] = target_encoder

    X = df[features].values
    return X, y, encoders, features


# ── Train ───────────────────────────────────────────────────────────────────

def train():
    df = load_data()
    X, y, encoders, features = prepare_features(df)

    print("\nSplitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print("Training Random Forest...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=12,
        min_samples_leaf=5,
        n_jobs=-1,
        random_state=42,
        class_weight="balanced",  # handles imbalanced severity classes
    )
    model.fit(X_train, y_train)

    print("\nEvaluation on test set:")
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred,
                                target_names=encoders["risk"].classes_))

    # Feature importance
    print("\nTop features by importance:")
    importances = sorted(
        zip(features, model.feature_importances_),
        key=lambda x: x[1], reverse=True
    )
    for feat, imp in importances:
        print(f"  {feat}: {imp:.3f}")

    # Save model + encoders
    output = {"model": model, "encoders": encoders, "features": features}
    joblib.dump(output, "model.joblib")
    print("\n✅ Model saved to model.joblib")


if __name__ == "__main__":
    train()