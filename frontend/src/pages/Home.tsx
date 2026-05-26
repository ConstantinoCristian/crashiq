import { useNavigate } from 'react-router-dom'
import React from "react";
import ukFlag from "../assets/ukF.png"
import usaFlag from "../assets/usaF.png"


interface CountryCardProps {
    country: 'uk' | 'us'
    label: string
    glowClass: string
}

function CountryCard({ country, label, glowClass }: CountryCardProps) {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/dashboard/${country}`)}
            className={`
        relative w-72 h-96 bg-neutral-950 rounded-sm cursor-pointer
        flex flex-col items-center justify-center gap-6 p-8
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-105
        group overflow-hidden
        ${glowClass}
      `}
        >
            {/* Country shape */}
            <div className="w-40 h-24 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {country === 'uk' ? <UKShape /> : <USShape />}
            </div>

            {/* Text */}
            <div className="text-center">
                <h2 className="text-white text-2xl font-light tracking-widest uppercase mb-2">
                    {label}
                </h2>
            </div>

            {/* Arrow */}
            <span className="text-white text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        →
      </span>
        </div>
    )
}

function UKShape() {
    return (
        <img src={ukFlag} alt="UK Flag" className="w-48 h-32 object-contain" />
    )
}

function USShape() {
    return (
        <img src={usaFlag} alt="USA Flag" />
    )
}

function Home() {
    return (
        <main className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-16 px-4">


            <div className="text-center">
                <h1 className="text-white font-thin tracking-[0.3em] text-6xl md:text-8xl uppercase mb-4">
                    CrashIQ
                </h1>
                <p className="text-neutral-500 text-sm tracking-widest font-light">
                    Global road accident analytics & risk prediction
                </p>
            </div>


            <div className="flex flex-wrap gap-8 justify-center">
                <CountryCard
                    country="uk"
                    label="United Kingdom"

                    glowClass="hover:shadow-[0_0_40px_rgba(207,20,43,0.4),0_0_80px_rgba(255,255,255,0.15),0_0_120px_rgba(0,36,125,0.45)]"
                />
                <CountryCard
                    country="us"
                    label="United States"
                    glowClass="hover:shadow-[0_0_40px_rgba(207,20,43,0.4),0_0_80px_rgba(255,255,255,0.30),0_0_120px_rgba(0,36,125,0.45)]"
                />
            </div>


            <div className="flex items-center gap-6 text-neutral-600 text-xs tracking-widest">
                <span>Road safety saves lives.</span>
                <a
                    href="https://www.who.int/initiatives/decade-of-action-for-road-safety-2021-2030"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-neutral-700 pb-px hover:text-neutral-400 hover:border-neutral-500 transition-colors duration-200"
                >
                    Support the cause →
                </a>
            </div>

        </main>
    )
}


export default Home