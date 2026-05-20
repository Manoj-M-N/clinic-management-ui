    import React, { useState } from 'react';
    import { Services } from '../service/service';
    import { useNavigate } from "react-router-dom";

    export default function Doctors() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const formdata = { email, password };

                const data = await Services.getDoctor(formdata);

                localStorage.setItem("doctorToken", data.token);

                navigate('/doctordashboard');

            } catch (err) {
                setError("Invalid credentials");
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">

                <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Doctor Login
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                        >
                            Login
                        </button>

                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition"
                        >
                            Back to Home
                        </button>

                    </form>
                </div>
            </div>
        );
    }