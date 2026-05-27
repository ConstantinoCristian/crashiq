import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Hamburger button — always visible */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed top-4 left-1/2 z-50 flex flex-col gap-1.5 p-2 group"
                aria-label="Toggle menu"
            >
                <div className="cursor-pointer flex flex-col gap-1.5 p-3 rounded-full hover:bg-neutral-800/60 transition-colors duration-200">
                    <span className="block w-6 h-px bg-white transition-all duration-300" />
                    <span className="block w-6 h-px bg-white transition-all duration-300" />
                    <span className="block w-6 h-px bg-white transition-all duration-300" />
                </div>


            </button>

            {/* Top drawer */}
            <div className={`
        fixed top-0 left-0 w-full z-40
        bg-[#0a0a0a]/95 backdrop-blur-sm
        border-b border-neutral-800
        transition-all duration-500 ease-in-out
        ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
                <div className="max-w-6xl mx-auto px-8 pt-20 pb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">

                    {/* Logo */}
                    <div>
                        <Link to="/" onClick={() => setOpen(false)}>
                            <h2 className="text-white text-4xl tracking-[0.2em] uppercase">
                                CrashIQ
                            </h2>
                        </Link>
                        <p className="text-neutral-600 text-xs tracking-widest mt-1">
                            Road accident analytics & risk prediction
                        </p>
                    </div>

                    {/* Links */}
                    <nav className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Link
                            to="/donate"
                            onClick={() => setOpen(false)}
                            className="text-neutral-400 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200"
                        >
                            Support the cause
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="text-neutral-400 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200"
                            >
                                Log in
                            </button>
                            <span className="text-neutral-700">|</span>
                            <button
                                onClick={() => setOpen(false)}
                                className="bg-white text-black text-sm tracking-widest uppercase px-4 py-2 hover:bg-neutral-200 transition-colors duration-200"
                            >
                                Sign up
                            </button>
                        </div>
                    </nav>

                </div>
            </div>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}