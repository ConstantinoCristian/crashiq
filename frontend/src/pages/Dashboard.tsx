import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AccidentChart from "../components/charts/AccidentChart"
import HotspotMap from "../components/charts/HotspotMap"
import { useAuth } from "../contexts/AuthContext"

const Dashboard = () => {
    const { country } = useParams<{ country: string }>()
    const [showCharts, setShowCharts] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center px-8 py-24 gap-8">
            <div className="w-full max-w-4xl flex flex-col gap-2">
                <p className="text-neutral-600 text-xs tracking-widest uppercase">Dashboard</p>
                <div className="flex items-end justify-between">
                    <h1 className="text-white text-3xl font-light tracking-widest uppercase">
                        {country?.toUpperCase()}
                    </h1>
                    <p className="text-neutral-600 text-xs tracking-widest">
                        Road accident analytics
                    </p>
                </div>
                <div className="w-full h-px bg-neutral-800" />
            </div>

            <div className="w-full max-w-4xl flex items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowCharts(true)}
                        className={`px-5 py-2 text-xs tracking-widest uppercase rounded transition-colors duration-200 ${
                            showCharts
                                ? "bg-white text-black"
                                : "bg-neutral-900 text-neutral-400 hover:bg-white"
                        }`}
                    >
                        Charts
                    </button>

                    <button
                        onClick={() => setShowCharts(false)}
                        className={`px-5 py-2 text-xs tracking-widest uppercase rounded transition-colors duration-200 ${
                            !showCharts
                                ? "bg-white text-black"
                                : "bg-neutral-900 text-neutral-400 hover:bg-white"
                        }`}
                    >
                        Map
                    </button>
                </div>

                <button
                    onClick={() =>
                        navigate(`/predict/${country}`)
                    }
                    className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 text-xs tracking-widest uppercase rounded transition-colors duration-200"
                >
                    Predict
                </button>
            </div>

            <div className="w-full max-w-4xl">
                {showCharts ? (
                    <AccidentChart country={country || "uk"} />
                ) : (
                    <HotspotMap country={country || "uk"} />
                )}
            </div>
        </div>
    )
}

export default Dashboard