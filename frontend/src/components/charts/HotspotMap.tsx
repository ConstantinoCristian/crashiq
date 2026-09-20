import React, {useEffect} from "react";
import {useState} from "react";
import AccidentChart from "./AccidentChart";
import axios from "axios"
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import react from "@vitejs/plugin-react";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

interface Hotspot{
    latitude: number,
    longitude: number,
    severity: string
}


interface Props{
    country: string
}

const SEVERITY_COLORS: Record<string, string> = {
    fatal: '#CF142B',
    serious: '#facc15',
    slight: '#4ade80',
}



const HotspotMap = ({country} : Props) => {

    const[hotspots,setHotspots] = useState<Hotspot[]>([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/accidents/hotspots?country=${country}`)
            .then(res => setHotspots(res.data.hotspots))

    }, [country]);

    const center: [number, number] = country === 'uk' ? [54.5, -3] : [39.5, -98.5]

    return (
        <div className="w-full z-0 max-w-4xl mx-auto rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <MapContainer center={center} zoom={country === 'uk' ? 6 : 4} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                {hotspots.map((h, i) => (
                    <CircleMarker
                        key={i}
                        center={[h.latitude, h.longitude]}
                        radius={3}
                        fillColor={SEVERITY_COLORS[h.severity] || '#fff'}
                        color="transparent"
                        fillOpacity={0.6}
                    >
                        <Tooltip>{h.severity}</Tooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>

    )
}

export default HotspotMap


