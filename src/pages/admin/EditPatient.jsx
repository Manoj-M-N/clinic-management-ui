import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Services } from "../../service/service";
import AdminLayout from "./AdminLayout";

export default function EditPatient() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    gender: "",
    age: "",
    disease: "",
    admissionDate: ""
  });

  // LOAD DATA
  useEffect(() => {
  Services.getPatientById(id).then((data) => {
    console.log("Fetched Patient:", data);

    setForm({
      fullName: data.fullName || "",
      phone: data.phone || "",
      gender: data.gender || "",
      age: data.age || "",
      disease: data.disease || "",
      admissionDate: data.admissionDate
        ? data.admissionDate.split("T")[0] // 🔥 FIX DATE
        : ""
    });
  });
}, [id]);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Services.updatePatient(id, form);
      alert("Updated successfully");
      navigate("/admin/patients");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Patient</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow w-96">

        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          placeholder="Gender"
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          placeholder="Age"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          value={form.disease}
          onChange={(e) => setForm({ ...form, disease: e.target.value })}
          placeholder="Disease"
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          value={form.admissionDate}
          onChange={(e) => setForm({ ...form, admissionDate: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </AdminLayout>
  );
}