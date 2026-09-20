import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../lib/supabse"
import { useNavigate } from "react-router-dom"

const Account = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [subscribed, setSubscribed] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-8 py-24">
            <div className="max-w-xl w-full flex flex-col gap-8">


                <div className="flex flex-col gap-2">
                    <p className="text-neutral-600 text-xs tracking-widest uppercase">Account</p>
                    <h1 className="text-white text-3xl font-light tracking-widest uppercase">
                        {user?.email}
                    </h1>
                    <div className="w-12 h-px bg-neutral-700 mt-2" />
                </div>


                <div className="flex flex-col gap-3">
                    <p className="text-neutral-600 text-xs tracking-widest uppercase">Quick actions</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-between bg-neutral-900 px-6 py-4 rounded hover:bg-neutral-800 transition-colors duration-200 text-left"
                    >
                        <span className="text-white text-sm tracking-widest uppercase">Back to dashboard</span>
                        <span className="text-neutral-500">{'>'}</span>
                    </button>
                </div>


                <div className="flex flex-col gap-4 bg-neutral-900 px-6 py-6 rounded">
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-sm tracking-widest uppercase">Road safety updates</p>
                        <p className="text-neutral-500 text-xs leading-relaxed">
                            Subscribe to receive monthly insights on road safety trends, new data releases, and awareness campaigns from the UK and US.
                        </p>
                    </div>
                    {subscribed ? (
                        <p className="text-green-500 text-xs tracking-widest">You are subscribed.</p>
                    ) : (
                        <button
                            onClick={() => setSubscribed(true)}
                            className="bg-white text-black text-sm tracking-widest uppercase px-4 py-3 hover:bg-neutral-200 transition-colors duration-200 w-fit"
                        >
                            Subscribe
                        </button>
                    )}
                </div>


                <button
                    onClick={handleSignOut}
                    className="text-neutral-600 text-xs tracking-widest uppercase hover:text-red-500 transition-colors duration-200 text-left"
                >
                    Sign out
                </button>

            </div>
        </div>
    )
}

export default Account