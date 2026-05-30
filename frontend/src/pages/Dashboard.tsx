import React from "react";
import AccidentChart from "../components/charts/AccidentChart";
import {useParams} from "react-router-dom"


const Dashboard = () => {

    const {country} = useParams<{country : string}>()

    return (
        <div className="min-h-screen bg-[#080808] flex flex-col items-center gap-8 px-8 py-24">
            <AccidentChart country={country || "uk"} />
        </div>
    )
}

export default Dashboard