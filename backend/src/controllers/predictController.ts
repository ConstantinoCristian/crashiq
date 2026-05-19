import { Request, Response } from 'express';
import axios from 'axios';

export const predictRisk = async (req: Request, res: Response): Promise<void> => {
  try {
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, req.body);
    res.json(mlResponse.data);
  } catch {
    res.status(500).json({ error: 'Prediction failed' });
  }
};
