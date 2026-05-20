import React, { useEffect, useState } from "react";
import { Services } from "../../service/service";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";

export default function PatientList() {

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const data = await Services.getPatients();
    setPatients(data);
  };

  // 🔥 SOFT DELETE (Deactivate)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deactivate this patient?");
    if (!confirmDelete) return;

    try {
      await Services.deletePatient(id);

      alert("Patient deactivated ✅");

      // 🔥 reload instead of filter (safe)
      loadPatients();

    } catch (err) {
      console.error(err);
      alert("Operation failed ❌");
    }
  };

  // ✏️ EDIT
  const handleEdit = (id) => {
    navigate(`/admin/edit-patient/${id}`);
  };

  // 🔍 FILTER LOGIC
  const filteredPatients = patients.filter((p) => {

    // 🔥 EXTRA SAFETY (hide inactive)
    if (p.status === "inactive") return false;

    const matchesSearch =
      p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search);

    const matchesDate =
      selectedDate === "" || p.admissionDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  // 📊 STATS
  const totalPatients = filteredPatients.length;

  const todayPatients = filteredPatients.filter(
    p => p.admissionDate === new Date().toISOString().slice(0,10)
  ).length;

  return (
    <>

      {/* 🔥 HEADER */}
      <h1 className="text-2xl font-bold mb-6">Patients Management</h1>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Patients</p>
          <h2 className="text-xl font-bold text-blue-600">{totalPatients}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Today Added</p>
          <h2 className="text-xl font-bold text-green-600">{todayPatients}</h2>
        </div>

      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-wrap gap-4 mb-4">

        <input
          placeholder="Search by name or phone..."
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

      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">

          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No patients found
                </td>
              </tr>
            ) : (
              filteredPatients.map((p) => (
                <tr
                  key={p.patientId}
                  className="text-center border-t hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">{p.fullName}</td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">{p.gender}</td>
                  <td className="p-3">{p.age}</td>
                  <td className="p-3">{p.admissionDate}</td>

                  <td className="p-3 space-x-2">

                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(p.patientId)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    {/* 🔥 DEACTIVATE */}
                    <button
                      onClick={() => handleDelete(p.patientId)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Deactivate
                    </button>

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </>
  );
}