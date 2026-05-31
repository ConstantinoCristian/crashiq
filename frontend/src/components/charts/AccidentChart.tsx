import React, {useEffect , useState} from "react";
import axios from 'axios'
import {
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Pie,
    PieChart,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend, BarChart, Bar
} from 'recharts'
import react from "@vitejs/plugin-react";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;





interface  Props{
    country : string
}

 const AccidentChart =  ({country} : Props) =>{
    const [data,setData] = useState([])
    const [severityData,setSeverityData] = useState([])
    const [time,setTime] = useState([])


     useEffect(() => {
         axios.get(`http://localhost:5000/api/stats?country=${country}`)
             .then(response => setData(response.data.byDate))

     }, [country]);

     useEffect(() => {
         axios.get(`http://localhost:5000/api/stats?country=${country}`)
             .then(res => setSeverityData(res.data.bySeverity.map((d: any) => ({
                 name: d.severity,
                 value: parseInt(d.count)
             }))))
     }, [country])

     useEffect(() => {
         axios.get(`http://localhost:5000/api/stats?country=${country}`)
             .then(res => setTime(res.data.byTimeOfDay))
     }, [country]);

     const COLORS = ['#4ade80', '#facc15', '#CF142B']

    return (
        <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-4xl mx-auto">
            <h3 className="text-neutral-400 text-xs tracking-widest uppercase mb-6">
                Accidents over time — {country?.toUpperCase()}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart  data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#444', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    />
                    <YAxis tick={{ fill: '#444', fontSize: 10 }} tickLine={false} axisLine={false}
                    />


                    <Tooltip
                        contentStyle={{ background: '#111', border: '1px solid #222', color: '#fff', fontSize: 12 }}
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    />
                    <Area type="monotone" dataKey="count" stroke="#CF142B" fill="#CF142B" fillOpacity={0.15}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-4xl mx-auto">
                <h3 className="text-neutral-400 text-xs tracking-widest uppercase mb-6">
                    Accidents by severity — {country?.toUpperCase()}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
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
                            {data.map((_: any, index: number) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ color: '#555', fontSize: 12 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-4xl mx-auto">
                <h3 className="text-neutral-400 text-xs tracking-widest uppercase mb-6">
                    Top 5 most dangerous times — {country?.toUpperCase()}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={time} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                        <XAxis dataKey="time" tick={{ fill: '#444', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fill: '#444', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', color: '#fff', fontSize: 12 }} />
                        <Bar dataKey="count" fill="#CF142B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>





        </div>
    )

}

export default AccidentChart