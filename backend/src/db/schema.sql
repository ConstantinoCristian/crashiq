CREATE TABLE IF NOT EXISTS accidents (
                                         id SERIAL PRIMARY KEY,
                                         source VARCHAR(10) NOT NULL,         -- 'UK' or 'US'
    severity VARCHAR(10) NOT NULL,       -- 'slight', 'serious', 'fatal'
    latitude FLOAT,
    longitude FLOAT,
    date DATE,
    time TIME,
    day_of_week INT,                     -- 1=Sunday, 7=Saturday
    weather VARCHAR(100),
    road_type VARCHAR(100),
    speed_limit INT,
    light_conditions VARCHAR(100),
    road_surface VARCHAR(100),
    urban_or_rural VARCHAR(20),          -- 'urban', 'rural'
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
    );

CREATE INDEX IF NOT EXISTS idx_accidents_source ON accidents(source);
CREATE INDEX IF NOT EXISTS idx_accidents_severity ON accidents(severity);
CREATE INDEX IF NOT EXISTS idx_accidents_latlong ON accidents(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_accidents_date ON accidents(date);