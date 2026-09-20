import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../../lib/supabse"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(error.message)
        } else {
            navigate("/") // goes back to wherever they came from
        }
    }

    return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="bg-neutral-900 p-10 rounded-lg w-full max-w-md flex flex-col gap-6">
                <h1 className="text-white text-2xl tracking-widest uppercase font-light">
                    Log in
                </h1>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="bg-neutral-800 text-white px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-500"
                />

                <button
                    onClick={handleLogin}
                    className="bg-white text-black py-3 text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors duration-200">
                    Log in
                </button>
                <p className="text-neutral-500 text-xs text-center">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-white hover:underline">Sign up</a>
                </p>
                <div>
                    {error? <p className="text-red-600">{error}</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Login