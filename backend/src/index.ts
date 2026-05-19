import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accidentRoutes from './routes/accidents';
import statsRoutes from './routes/stats';
import predictRoutes from './routes/predict';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'crashiq-backend' });
});

app.use('/api/accidents', accidentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/predict', predictRoutes);

app.listen(PORT, () => {
  console.log(`CrashIQ backend running on port ${PORT}`);
});

export default app;
