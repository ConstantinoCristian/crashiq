import { Request, Response } from 'express';

export const getAccidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 50 } = req.query;
    res.json({ data: [], page: Number(page), limit: Number(limit), total: 0 });
  } catch {
    res.status(500).json({ error: 'Failed to fetch accidents' });
  }
};

export const getHotspots = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json({ hotspots: [] });
  } catch {
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
};
