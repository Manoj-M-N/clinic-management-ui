import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white">

      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">
        Clinic Management System
      </h1>

      <p className="text-lg mb-10 text-center max-w-md">
        Manage patients, appointments, and doctors efficiently with our smart system.
      </p>

      {/* Cards */}
      <div className="flex gap-10">

        {/* Admin Card */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-64 text-center hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <p className="text-sm mb-6">
            Manage patients, doctors, and appointments.
          </p>
          <Link to="/adminlogin">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              Admin Login
            </button>
          </Link>
        </div>

        {/* Doctor Card */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-64 text-center hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-4">Doctor Panel</h2>
          <p className="text-sm mb-6">
            View appointments and manage patient records.
          </p>
          <Link to="/doctorlogin">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Doctor Login
            </button>
          </Link>
        </div>

      </div>

      {/* Footer */}
      <p className="mt-10 text-sm opacity-80">
        © 2026 Clinic Management System
      </p>

    </div>
  );
}