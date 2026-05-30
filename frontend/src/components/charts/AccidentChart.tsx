import React, {useEffect , useState} from "react";
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import react from "@vitejs/plugin-react";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


interface  Props{
    country : string
}

 const AccidentChart =  ({country} : Props) =>{
    const [data,setData] = useState([])


     useEffect(() => {
         axios.get(`http://localhost:5000/api/stats?country=${country}`)
             .then(response => setData(response.data.byDate))

     }, [country]);

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
        </div>
    )

}

export default AccidentChart