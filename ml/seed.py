"""
seed.py — Clean UK + US accident CSVs and load into PostgreSQL.
Run with: python seed.py
Requires: pip install pandas psycopg2-binary python-dotenv
"""

import os
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv


DATABASE_URL = "postgresql://crashiq:crashiq_dev@db:5432/crashiq"

# ── UK severity mapping ─────────────────────────────────────────────────────
UK_SEVERITY = {"1": "fatal", "2": "serious", "3": "slight"}

UK_WEATHER = {
    "1": "fine no high winds",
    "2": "raining no high winds",
    "3": "snowing no high winds",
    "4": "fine high winds",
    "5": "raining high winds",
    "6": "fog or mist",
    "7": "other",
    "8": "unknown",
    "9": "unknown",
}

UK_ROAD_TYPE = {
    "1": "roundabout",
    "2": "one way street",
    "3": "dual carriageway",
    "6": "single carriageway",
    "7": "slip road",
    "9": "unknown",
    "12": "one way street",
}

UK_LIGHT = {
    "1": "daylight",
    "4": "darkness lights lit",
    "5": "darkness lights unlit",
    "6": "darkness no lighting",
    "7": "darkness lighting unknown",
}

UK_SURFACE = {
    "1": "dry",
    "2": "wet or damp",
    "3": "snow",
    "4": "frost or ice",
    "5": "flood over 3cm deep",
    "6": "oil or diesel",
    "7": "mud",
}

# ── US severity mapping ─────────────────────────────────────────────────────
US_SEVERITY = {1: "slight", 2: "slight", 3: "serious", 4: "fatal"}


def clean_uk(path: str) -> pd.DataFrame:
    print("Loading UK data...")
    df = pd.read_csv(path, low_memory=False)

    out = pd.DataFrame()
    out["source"] = "UK"
    out["severity"] = df["collision_severity"].astype(str).map(UK_SEVERITY).fillna("slight")
    out["latitude"] = pd.to_numeric(df["latitude"], errors="coerce")
    out["longitude"] = pd.to_numeric(df["longitude"], errors="coerce")
    out["date"] = pd.to_datetime(df["date"], dayfirst=True, errors="coerce").dt.date
    out["time"] = pd.to_datetime(df["time"], format="%H:%M", errors="coerce").dt.time
    out["day_of_week"] = pd.to_numeric(df["day_of_week"], errors="coerce")
    out["weather"] = df["weather_conditions"].astype(str).map(UK_WEATHER).fillna("unknown")
    out["road_type"] = df["road_type"].astype(str).map(UK_ROAD_TYPE).fillna("unknown")
    out["speed_limit"] = pd.to_numeric(df["speed_limit"], errors="coerce")
    out["light_conditions"] = df["light_conditions"].astype(str).map(UK_LIGHT).fillna("unknown")
    out["road_surface"] = df["road_surface_conditions"].astype(str).map(UK_SURFACE).fillna("unknown")
    out["urban_or_rural"] = df["urban_or_rural_area"].map({1: "urban", 2: "rural"}).fillna("unknown")
    out["country"] = "UK"

    out = out.dropna(subset=["latitude", "longitude"])
    print(f"  UK rows loaded: {len(out):,}")
    return out


def clean_us(path: str) -> pd.DataFrame:
    print("Loading US data...")
    # US dataset is large — sample 200k rows to keep things manageable
    df = pd.read_csv(path, low_memory=False, nrows=200000)

    out = pd.DataFrame()
    out["source"] = "US"
    out["severity"] = df["Severity"].map(US_SEVERITY).fillna("slight")
    out["latitude"] = pd.to_numeric(df["Start_Lat"], errors="coerce")
    out["longitude"] = pd.to_numeric(df["Start_Lng"], errors="coerce")
    out["date"] = pd.to_datetime(df["Start_Time"], errors="coerce").dt.date
    out["time"] = pd.to_datetime(df["Start_Time"], errors="coerce").dt.time
    out["day_of_week"] = pd.to_datetime(df["Start_Time"], errors="coerce").dt.dayofweek + 1
    out["weather"] = df["Weather_Condition"].str.lower().fillna("unknown")
    out["road_type"] = "unknown"  # US dataset doesn't have road type
    out["speed_limit"] = None     # US dataset doesn't have speed limit
    out["light_conditions"] = df["Sunrise_Sunset"].str.lower().fillna("unknown")
    out["road_surface"] = "unknown"
    out["urban_or_rural"] = "unknown"
    out["country"] = "US"

    out = out.dropna(subset=["latitude", "longitude"])
    print(f"  US rows loaded: {len(out):,}")
    return out


def seed(df: pd.DataFrame, conn):
    cursor = conn.cursor()

    rows = [
        (
            row.source, row.severity, row.latitude, row.longitude,
            row.date, row.time, row.day_of_week, row.weather,
            row.road_type, row.speed_limit, row.light_conditions,
            row.road_surface, row.urban_or_rural, row.country
        )
        for row in df.itertuples(index=False)
    ]

    execute_values(cursor, """
                           INSERT INTO accidents (
                               source, severity, latitude, longitude,
                               date, time, day_of_week, weather,
                               road_type, speed_limit, light_conditions,
                               road_surface, urban_or_rural, country
                           ) VALUES %s
                           """, rows, page_size=1000)

    conn.commit()
    cursor.close()
    print(f"  Inserted {len(rows):,} rows")


if __name__ == "__main__":
    uk_path = "/data/uk_accidents.csv"
    us_path = "/data/us_accidents.csv"

    uk_df = clean_uk(uk_path)
    us_df = clean_us(us_path)
    combined = pd.concat([uk_df, us_df], ignore_index=True)
    print(f"\nTotal rows to insert: {len(combined):,}")

    print("\nConnecting to database...")
    conn = psycopg2.connect(DATABASE_URL)

    # Run schema first
    with open("/backend/src/db/schema.sql") as f:
        conn.cursor().execute(f.read())
    conn.commit()
    print("Schema created")

    seed(combined, conn)
    conn.close()
    print("\n✅ Done! Data is in PostgreSQL.")