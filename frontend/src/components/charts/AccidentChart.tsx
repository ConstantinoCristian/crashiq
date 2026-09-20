import React, { useEffect, useState } from "react"
import axios from "axios"
import {
    Cell, AreaChart, Area, XAxis, YAxis, Pie, PieChart,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from "recharts"

interface Props {
    country: string
}

const SEVERITY_COLORS = ["#4ade80", "#facc15", "#CF142B"]
const WEATHER_COLORS = ["#569846", "#fa1515", "#a014cf", "#639be6", "#f97316", "#06b6d4", "#ec4899"]

const AccidentChart = ({ country }: Props) => {
    const [data, setData] = useState([])
    const [severityData, setSeverityData] = useState([])
    const [timeData, setTimeData] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/stats?country=${country}`)
            .then(res => {
                setData(res.data.byDate)
                setSeverityData(res.data.bySeverity.map((d: any) => ({
                    name: d.severity,
                    value: parseInt(d.count)
                })))
                setTimeData(res.data.byTimeOfDay)
                setWeatherData(res.data.byWeather.map((d: any) => ({
                    name: d.weather,
                    value: parseInt(d.count)
                })))
            })
    }, [country])

    const tooltipStyle = {
        backgroundColor: "#111",
        border: "1px solid #333",
        color: "#fff",
        fontSize: 12
    }

    const tooltipItemStyle = {
        color: "#fff"
    }

    const tooltipLabelStyle = {
        color: "#fff"
    }

    const tickStyle = {
        fill: "#444",
        fontSize: 10
    }

    const charts = [
        {
            title: "Accidents over time",
            subtitle: "Daily collision count throughout the year",
            chart: (
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                        <XAxis
                            dataKey="date"
                            tick={tickStyle}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => new Date(v).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                        />
                        <YAxis tick={tickStyle} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelFormatter={(v) => new Date(v).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        />
                        <Area type="monotone" dataKey="count" stroke="#CF142B" fill="#CF142B" fillOpacity={0.15} />
                    </AreaChart>
                </ResponsiveContainer>
            )
        },
        {
            title: "Accidents by severity",
            subtitle: "Breakdown of slight, serious and fatal collisions",
            chart: (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={severityData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {severityData.map((_: any, i: number) => (
                                <Cell key={i} fill={SEVERITY_COLORS[i % SEVERITY_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "1px solid #333",
                            }}
                            itemStyle={{
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                        />
                        <Legend wrapperStyle={{ color: "#555", fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
            )
        },
        {
            title: "Top 5 most dangerous times",
            subtitle: "Hours of the day with the highest accident frequency",
            chart: (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={timeData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                        <XAxis
                            dataKey="time"
                            tick={tickStyle}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => v?.slice(0, 5)}
                        />
                        <YAxis tick={tickStyle} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="count" fill="#CF142B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )
        },
        {
            title: "Accidents by weather",
            subtitle: "Distribution of collisions across weather conditions",
            chart: (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={weatherData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {weatherData.map((_: any, i: number) => (
                                <Cell key={i} fill={WEATHER_COLORS[i % WEATHER_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "1px solid #333",
                            }}
                            itemStyle={{
                                color: "#fff",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                        />
                        <Legend wrapperStyle={{ color: "#000", fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
            )
        }
    ]

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">

            {/* Carousel card */}
            <div className="bg-neutral-900 rounded-lg p-8 flex flex-col gap-6">

                {/* Chart header */}
                <div className="flex flex-col gap-1">
                    <p className="text-neutral-500 text-xs tracking-widest uppercase">
                        {current + 1} of {charts.length}
                    </p>
                    <h3 className="text-white text-lg font-light tracking-widest uppercase">
                        {charts[current].title}
                    </h3>
                    <p className="text-neutral-500 text-xs">
                        {charts[current].subtitle} — {country.toUpperCase()}
                    </p>
                </div>


                {charts[current].chart}


                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setCurrent(prev => Math.max(prev - 1, 0))}
                        disabled={current === 0}
                        className="px-6 py-2 text-xs tracking-widest uppercase text-neutral-400 hover:text-white disabled:opacity-20 transition-colors duration-200"
                    >
                        Previous
                    </button>


                    <div className="flex gap-2">
                        {charts.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                                    i === current ? "bg-white" : "bg-neutral-600 hover:bg-neutral-400"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrent(prev => Math.min(prev + 1, charts.length - 1))}
                        disabled={current === charts.length - 1}
                        className="px-6 py-2 text-xs tracking-widest uppercase text-neutral-400 hover:text-white disabled:opacity-20 transition-colors duration-200"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccidentChart