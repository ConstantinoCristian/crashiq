import React, { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"


const weatherOptions = [
    "fine no high winds",
    "raining no high winds",
    "raining high winds",
    "fog or mist",
    "snowing no high winds",
    "fine high winds",
    "other",
]

const roadTypeOptions = [
    "single carriageway",
    "dual carriageway",
    "roundabout",
    "one way street",
    "slip road",
    "unknown",
]

const roadSurfaceOptions = [
    "dry",
    "wet or damp",
    "snow",
    "frost or ice",
    "flood over 3cm deep",
]

const riskColour: Record<string, string> = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-500",
}

const riskBg: Record<string, string> = {
    low: "bg-green-400",
    medium: "bg-yellow-400",
    high: "bg-red-500",
}

const Predict = () => {
    const { country } = useParams<{ country: string }>()

    const [form, setForm] = useState({
        weather: "fine no high winds",
        timeOfDay: "day",
        roadType: "single carriageway",
        speedLimit: 30,
        roadSurface: "dry",
        urbanOrRural: "urban",
    })

    const [result, setResult] = useState<{
        riskLevel: string
        riskScore: number
        confidence: number
        topFactors: string[]
    } | null>(null)

    const [loading, setLoading] = useState(false)

    const handlePrediction = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5000/api/predict`, {
                ...form,
                country: country?.toUpperCase() || "UK"
            })
            setResult(res.data)
        } catch (error) {
            console.error("Error fetching prediction:", error)
        } finally {
            setLoading(false)
        }
    }

    const update= (key : string , value : string | number) => {
        setForm(prev => ({...prev, [key]:value}))
    }

    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center px-8 py-24 gap-10">


            <div className="max-w-2xl w-full flex flex-col gap-3">
                <p className="text-neutral-600 text-xs tracking-widest uppercase">
                    Risk predictor — {country?.toUpperCase()}
                </p>
                <h1 className="text-white text-3xl font-light tracking-widest uppercase">
                    Predict accident risk
                </h1>
                <div className="w-12 h-px bg-neutral-700" />
                <p className="text-neutral-500 text-xs leading-relaxed mt-2">
                    This tool uses a Random Forest machine learning model trained on{" "}
                    {country?.toUpperCase() === "UK" ? "100,000+ UK STATS19 collisions" : "200,000+ US accident records"}.
                    Predictions are probabilistic estimates based on historical patterns —
                    not a guarantee of safety. Always drive with care.
                </p>
            </div>


            <div className="max-w-2xl w-full bg-neutral-900 rounded-lg p-8 flex flex-col gap-6">


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">Weather</label>
                    <select
                        value={form.weather}
                        onChange={e => update("weather", e.target.value)}
                        className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600"
                    >
                        {weatherOptions.map(w => (
                            <option key={w} value={w}>{w}</option>
                        ))}
                    </select>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">Road type</label>
                    <select
                        value={form.roadType}
                        onChange={e => update("roadType", e.target.value)}
                        className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600"
                    >
                        {roadTypeOptions.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">Road surface</label>
                    <select
                        value={form.roadSurface}
                        onChange={e => update("roadSurface", e.target.value)}
                        className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600"
                    >
                        {roadSurfaceOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">
                        Speed limit — {form.speedLimit} mph
                    </label>
                    <input
                        type="range"
                        min={10}
                        max={70}
                        step={10}
                        value={form.speedLimit}
                        onChange={e => update("speedLimit", Number(e.target.value))}
                        className="accent-white"
                    />
                    <div className="flex justify-between text-neutral-600 text-xs">
                        <span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span>
                    </div>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">Time of day</label>
                    <div className="flex gap-3">
                        {["day", "night"].map(t => (
                            <button
                                key={t}
                                onClick={() => update("timeOfDay", t)}
                                className={`flex-1 py-3 text-sm tracking-widest uppercase rounded transition-colors duration-200 ${
                                    form.timeOfDay === t
                                        ? "bg-white text-black"
                                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-neutral-500 text-xs tracking-widest uppercase">Area</label>
                    <div className="flex gap-3">
                        {["urban", "rural"].map(a => (
                            <button
                                key={a}
                                onClick={() => update("urbanOrRural", a)}
                                className={`flex-1 py-3 text-sm tracking-widest uppercase rounded transition-colors duration-200 ${
                                    form.urbanOrRural === a
                                        ? "bg-white text-black"
                                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                                }`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handlePrediction}
                    disabled={loading}
                    className="bg-white text-black py-4 text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors duration-200 disabled:opacity-50 mt-2"
                >
                    {loading ? "Analysing..." : "Generate prediction"}
                </button>
            </div>


            {result && (
                <div className="max-w-2xl w-full bg-neutral-900 rounded-lg p-8 flex flex-col gap-6">
                    <p className="text-neutral-500 text-xs tracking-widest uppercase">Prediction result</p>

                    <div className="flex items-end gap-4">
                        <span className={`text-6xl font-light uppercase tracking-widest ${riskColour[result.riskLevel]}`}>
                            {result.riskLevel}
                        </span>
                        <span className="text-neutral-500 text-sm mb-2">risk</span>
                    </div>


                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-xs text-neutral-600">
                            <span>Risk score</span>
                            <span>{(result.riskScore * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-800 rounded-full">
                            <div
                                className={`h-1 rounded-full transition-all duration-700 ${riskBg[result.riskLevel]}`}
                                style={{ width: `${result.riskScore * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-500 text-xs tracking-widest uppercase">Confidence</p>
                        <p className="text-white text-sm">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-500 text-xs tracking-widest uppercase">Top contributing factors</p>
                        <div className="flex flex-wrap gap-2">
                            {result.topFactors.map((f, i) => (
                                <span key={i} className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded-full tracking-widest uppercase">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="text-neutral-600 text-xs leading-relaxed">
                        This prediction is generated by a machine learning model trained on historical accident data.
                        It reflects statistical patterns and should not be used as a substitute for safe driving practices.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Predict