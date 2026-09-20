import { Request, Response } from 'express';
import pool from "../models/db";

export const getAccidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50 } = req.query;
    res.json({ data: [], page: Number(page), limit: Number(limit), total: 0 });
  } catch {
    res.status(500).json({ error: 'Failed to fetch accidents' });
  }
};

export const getHotspots = async (req: Request, res: Response): Promise<void> => {
  try {
    const country = (req.query.country as string)?.toUpperCase() || "UK"
    const result = await pool.query(
        'SELECT latitude, longitude, severity FROM accidents WHERE country = $1 AND latitude is not null and longitude is not null limit 5000',
        [country]
    )
    res.json({ hotspots: result.rows });

  } catch {
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
};
