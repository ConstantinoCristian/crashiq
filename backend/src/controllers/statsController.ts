import { Request, Response } from 'express';

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ totalAccidents: 0, byWeather: {}, byTimeOfDay: {}, byVehicleType: {} });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
