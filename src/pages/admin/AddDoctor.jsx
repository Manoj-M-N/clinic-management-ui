import { useState } from "react";
import { Services } from "../../service/service";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {

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
    password: ""

  });

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await Services.createDoctor(form);

      alert("Doctor created successfully");

      navigate("/admin/doctors");

    } catch (err) {

      console.error(err);

      alert("Failed to create doctor");
    }
  };

  return (

    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Add Doctor
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new doctor profile
        </p>

      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-4xl">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          {/* NAME */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name
            </label>

            <input
              type="text"
              required
              placeholder="Enter doctor name"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  doctorName: e.target.value,
                })
              }
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              required
              placeholder="Enter email"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

          </div>

          {/* PHONE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="text"
              required
              placeholder="Enter phone number"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

          </div>

          {/* SPECIALIZATION */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>

            <input
              type="text"
              required
              placeholder="Cardiology, Neurology..."
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  specialization: e.target.value,
                })
              }
            />

          </div>

          {/* FEE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Fee
            </label>

            <input
              type="number"
              required
              placeholder="500"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  consultationFee: e.target.value,
                })
              }
            />

          </div>

          {/* EXPERIENCE */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (Years)
            </label>

            <input
              type="number"
              required
              placeholder="5"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: e.target.value,
                })
              }
            />

          </div>

          {/* START TIME */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Start Time
            </label>

            <input
              type="time"
              required
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  availableStartTime:
                    e.target.value,
                })
              }
            />

          </div>

          {/* END TIME */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available End Time
            </label>

            <input
              type="time"
              required
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  availableEndTime:
                    e.target.value,
                })
              }
            />

          </div>

          {/* PASSWORD */}
          <div className="col-span-2">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              placeholder="Enter password"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

          </div>

          {/* BUTTON */}
          <div className="col-span-2 flex justify-end">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold"
            >
              Create Doctor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}