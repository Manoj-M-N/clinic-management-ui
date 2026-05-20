import { useEffect, useState } from "react";
import { Services } from "../../service/service";
import { useNavigate } from "react-router-dom";

export default function DoctorList() {

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await Services.getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Deactivate this doctor?");
    if (!confirm) return;

    try {
      await Services.deleteDoctor(id); // ✅ NOW WORKS
      alert("Doctor deactivated ✅");
      loadDoctors();
    } catch (err) {
      alert("Failed ❌");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-doctor/${id}`);
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors</h1>

        <button
          onClick={() => navigate("/admin/add-doctor")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Doctor
        </button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No doctors found
                </td>
              </tr>
            ) : (
              doctors.map((d) => (
                <tr key={d.doctorId} className="border-t">

                  <td className="p-4">{d.doctorId}</td>
                  <td className="p-4">{d.doctorName}</td>
                  <td className="p-4">{d.email}</td>
                  <td className="p-4">{d.specialization}</td>

                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(d.doctorId)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(d.doctorId)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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

    </div>
  );
}