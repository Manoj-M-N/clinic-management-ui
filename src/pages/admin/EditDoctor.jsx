import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Services } from "../../service/service";

export default function EditDoctor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctorName: "",
    email: "",
    specialization: "",
    phone: "",
    consultationFee: "",
    experience: "",
    availableStartTime: "",
    availableEndTime: "",
    status: "",
    password: ""
  });

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data = await Services.getDoctorById(id, "ADMIN");

        setForm({
          doctorName: data.doctorName || "",
          email: data.email || "",
          specialization: data.specialization || "",
          phone: data.phone || "",
          consultationFee: data.consultationFee || "",
          experience: data.experience || "",
          availableStartTime: data.availableStartTime || "",
          availableEndTime: data.availableEndTime || "",
          status: data.status || "active",
          password: ""
        });

      } catch (err) {
        console.error(err);
      }
    };

    loadDoctor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Services.updateDoctor(id, form);
      alert("Doctor Updated ✅");
      navigate("/admin/doctors");
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Edit Doctor</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[500px] space-y-4"
      >

        <input
          value={form.doctorName}
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          placeholder="Doctor Name"
          className="w-full p-2 border rounded"
        />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />

        <input
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          placeholder="Specialization"
          className="w-full p-2 border rounded"
        />

        <button className="bg-yellow-500 text-white px-4 py-2 rounded w-full">
          Update Doctor
        </button>

      </form>

    </div>
  );
}