import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabse"
import {useState} from "react";
import React from "react";

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            setError(error.message)
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="bg-neutral-900 p-10 rounded-lg w-full max-w-md flex flex-col gap-6">
                <h1 className="text-white text-2xl tracking-widest uppercase font-light">
                    Sign up
                </h1>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-500"
                />
                <button
                    onClick={handleSignup}
                    className="bg-white text-black py-3 text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors duration-200"
                >
                    Sign up
                </button>
                <p className="text-neutral-500 text-xs text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-white hover:underline">Log in</a>
                </p>
            </div>
        </div>
    )
}

export default Signup