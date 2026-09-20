import React from "react"

function Donate() {
    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-8 py-24">
            <div className="max-w-2xl w-full flex flex-col gap-10">

                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-4xl font-light tracking-widest uppercase">
                        Support the cause
                    </h1>
                    <div className="w-12 h-px bg-neutral-700" />
                </div>

                <div className="flex flex-col gap-6 text-neutral-400 text-sm leading-relaxed font-light">
                    <p>
                        Every year, over 1.35 million people lose their lives on roads around the world.
                        Millions more are left with life-changing injuries. Road traffic crashes are the
                        leading cause of death for children and young adults aged 5 to 29.
                    </p>
                    <p>
                        CrashIQ was built to make road accident data accessible, understandable, and
                        actionable. But data alone is not enough. The organisations below work directly
                        with governments, communities, and individuals to make roads safer through
                        research, advocacy, and on-the-ground programmes.
                    </p>
                    <p>
                        If this project has been useful to you, consider supporting the people doing
                        the real work.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-neutral-600 text-xs tracking-widest uppercase">
                        Organisations you can support
                    </p>

                    <a
                        href="https://www.roadsafetygb.org.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-neutral-900 px-6 py-5 rounded hover:bg-neutral-800 transition-colors duration-200"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-white text-sm tracking-widest uppercase">
                                Road Safety GB
                            </span>
                            <span className="text-neutral-500 text-xs">
                                United Kingdom — advocacy, research and education
                            </span>
                        </div>
                        <span className="text-neutral-500 group-hover:text-white transition-colors duration-200">
                            {'>'}
                        </span>
                    </a>

                    <a
                        href="https://www.nsc.org/road-safety"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-neutral-900 px-6 py-5 rounded hover:bg-neutral-800 transition-colors duration-200"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-white text-sm tracking-widest uppercase">
                                National Safety Council
                            </span>
                            <span className="text-neutral-500 text-xs">
                                United States — road safety programmes and campaigns
                            </span>
                        </div>
                        <span className="text-neutral-500 group-hover:text-white transition-colors duration-200">
                            {'>'}
                        </span>
                    </a>

                    <a
                        href="https://www.who.int/initiatives/decade-of-action-for-road-safety-2021-2030"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between bg-neutral-900 px-6 py-5 rounded hover:bg-neutral-800 transition-colors duration-200"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-white text-sm tracking-widest uppercase">
                                WHO — Decade of Action
                            </span>
                            <span className="text-neutral-500 text-xs">
                                Global — UN road safety initiative 2021 to 2030
                            </span>
                        </div>
                        <span className="text-neutral-500 group-hover:text-white transition-colors duration-200">
                            {'>'}
                        </span>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Donate