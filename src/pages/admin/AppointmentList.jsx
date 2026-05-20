import React, { useEffect, useState } from "react";
import { Services } from "../../service/service";

export default function AppointmentList() {

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [viewMode, setViewMode] = useState("today"); // 🔥 NEW

  // 🔥 LOAD DATA
  const loadAppointments = async () => {
  try {
    let data;

    if (viewMode === "today") {
      data = await Services.getAppointments(); // today only
    } else {
      data = await Services.getAppointmentHistory(); // 🔥 history
    }

    setAppointments(data);

  } catch (err) {
    console.error("Error loading appointments", err);
  }
};

  useEffect(() => {
  loadAppointments();
}, [viewMode]); // ✅ REQUIRED
  // 🔥 CANCEL
  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this appointment?");
    if (!confirm) return;

    try {
      await Services.cancelAppointment(id);
      alert("Cancelled ✅");
      loadAppointments();
    } catch {
      alert("Failed ❌");
    }
  };

  // 🔍 SAFE DATA
  const getPatientName = (a) =>
    a.fullName || a.patientName || a.patient?.fullName || "";

  const getDoctorName = (a) =>
    a.doctorName || a.doctor?.doctorName || "";

  const today = new Date().toISOString().slice(0, 10);

  // 🔥 FILTER LOGIC
  const filteredAppointments = appointments.filter((a) => {

    const patient = getPatientName(a).toLowerCase();
    const doctor = getDoctorName(a).toLowerCase();

    const matchesSearch =
      patient.includes(search.toLowerCase()) ||
      doctor.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : (a.status || "").toLowerCase() === statusFilter;

    const matchesDate =
      selectedDate === "" ||
      a.appointmentDate?.slice(0, 10) === selectedDate;

    // 🔥 TODAY / HISTORY LOGIC
    const matchesView =
      viewMode === "today"
        ? a.appointmentDate?.slice(0, 10) === today
        : true;

    return matchesSearch && matchesStatus && matchesDate && matchesView;
  });

  const totalCount = filteredAppointments.length;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {/* 🔘 TODAY / HISTORY BUTTONS */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setViewMode("today")}
          className={`px-4 py-2 rounded ${
            viewMode === "today"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Today
        </button>

        <button
          onClick={() => setViewMode("history")}
          className={`px-4 py-2 rounded ${
            viewMode === "history"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          History
        </button>
      </div>

      {/* 🔍 SEARCH + DATE */}
      <div className="flex gap-4 mb-4 flex-wrap">

        <input
          placeholder="Search by patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="font-medium text-gray-600 flex items-center">
          Total:
          <span className="ml-2 text-blue-600 font-bold">
            {totalCount}
          </span>
        </div>
      </div>

      {/* 🔥 STATUS FILTER */}
      <div className="flex gap-3 mb-4">
        {["scheduled", "completed", "cancelled", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 📊 TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No appointments found
                </td>
              </tr>
            ) : (
              filteredAppointments.map((a, index) => (
                <tr key={a.appointmentId || index} className="border-t">

                  <td className="px-6 py-3">{a.appointmentId}</td>
                  <td className="px-6 py-3">{getPatientName(a)}</td>
                  <td className="px-6 py-3">{getDoctorName(a)}</td>
                  <td className="px-6 py-3">{a.appointmentDate?.slice(0,10)}</td>
                  <td className="px-6 py-3">{a.appointmentTime?.slice(0,5)}</td>

                  <td className="px-4 py-2">
                    {a.status === "scheduled" && (
                      <button
                        onClick={() => handleCancel(a.appointmentId)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          a.status === "scheduled"
                            ? "bg-green-100 text-green-700"
                            : a.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : a.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-200"
                        }
                      `}
                    >
                      {a.status || "pending"}
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}