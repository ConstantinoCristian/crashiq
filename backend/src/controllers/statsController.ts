import { Request, Response } from 'express'
import pool from '../models/db'

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const country = (req.query.country as string)?.toUpperCase() || 'UK'

    const totalResult = await pool.query(
        'SELECT COUNT(*) as count FROM accidents WHERE country = $1',
        [country]
    )

    const byWeather = await pool.query(
        'SELECT weather, COUNT(*) as count FROM accidents WHERE country = $1 GROUP BY weather ORDER BY count DESC LIMIT 10',
        [country]
    )

    const byTimeOfDay = await pool.query(
        'SELECT time, COUNT(*) as count FROM accidents WHERE country = $1 GROUP BY time ORDER BY count DESC LIMIT 10',
        [country]
    )

    const bySeverity = await pool.query(
        'SELECT severity, COUNT(*) as count FROM accidents WHERE country = $1 GROUP BY severity ORDER BY count DESC',
        [country]
    )

    const byDate = await pool.query(
        "SELECT date,COUNT(*) as count FROM accidents where country = $1 GROUP BY date ORDER BY count desc",
        [country])

    res.json({
      totalAccidents: totalResult.rows[0].count,
      byWeather: byWeather.rows,
      byTimeOfDay: byTimeOfDay.rows,
      bySeverity: bySeverity.rows,
      byDate: byDate.rows
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}