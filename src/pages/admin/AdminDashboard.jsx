import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { Services } from "../../service/service";

export default function AdminDashboard() {

  const [counts, setCounts] = useState({
    patients: 0,
    appointments: 0,
    doctors: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patients = await Services.getPatients();
        const appointments = await Services.getAppointments();
        const doctors = await Services.getDoctors();

        setCounts({
          patients: patients.length,
          appointments: appointments.length,
          doctors: doctors.length,
        });

      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Patients */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Patients</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {counts.patients}
          </p>

          <button
            onClick={() => navigate("/admin/patients")}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            View Patients →
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Appointments</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {counts.appointments}
          </p>

          <button
            onClick={() => navigate("/admin/appointments")}
            className="mt-4 text-sm text-green-600 hover:underline"
          >
            View Appointments →
          </button>
        </div>

        {/* Doctors */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Doctors</h2>
          <p className="text-3xl font-bold text-purple-500 mt-2">
            {counts.doctors}
          </p>

          <div className="mt-4 space-x-2">
            <button
              onClick={() => navigate("/admin/doctors")}
              className="text-sm text-purple-600 hover:underline"
            >
              View
            </button>

            <button
              onClick={() => navigate("/admin/add-doctor")}
              className="text-sm text-blue-600 hover:underline"
            >
              Add
            </button>
          </div>
        </div>

      </div>

    </>
  );
}