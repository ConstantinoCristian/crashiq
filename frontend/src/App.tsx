import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Predict from './pages/Predict'
import Donate from './pages/Donate'
import Login from "./components/auth/LoginModal";
import Signup from "./components/auth/SignupModal";
import Account from "./pages/Account";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard/:country" element={<Dashboard />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/predict/:country" element={

                            <Predict />

                    } />
                    <Route path="/account" element={

                            <Account />

                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App