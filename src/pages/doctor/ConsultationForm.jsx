// src/pages/doctor/ConsultationForm.jsx

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorApi from "../../doctorApi";
import { useEffect } from "react";

export default function ConsultationForm() {

  const navigate = useNavigate();
  const location = useLocation();

  const [medicines, setMedicines] =useState([]);
  const [medicalHistory, setMedicalHistory] = useState(null);
  // 🔥 appointment passed from dashboard
  const appointment = location.state?.appointment;

  const [form, setForm] = useState({
    symptoms: "",
    diagnosis: "",
    notes: "",
    bloodPressure: "",
    temperature: "",
    pulse: "",
  });

  const [prescriptions, setPrescriptions] = useState([
    {
      medicineName: "",
      dosage: "",
      timing: "",
      days: "",
      notes: "",
    },
  ]);

  // ✅ HANDLE CONSULTATION INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ HANDLE PRESCRIPTION CHANGE
  const handlePrescriptionChange = (index, field, value) => {

    const updated = [...prescriptions];

    updated[index][field] = value;

    setPrescriptions(updated);
  };

  // ✅ ADD MEDICINE
  const addPrescription = () => {

    setPrescriptions([
      ...prescriptions,
      {
        medicineName: "",
        dosage: "",
        timing: "",
        days: "",
        notes: "",
      },
    ]);
  };

  // ✅ REMOVE MEDICINE
  const removePrescription = (index) => {

    const updated = prescriptions.filter((_, i) => i !== index);

    setPrescriptions(updated);
  };

  // ✅ SAVE CONSULTATION
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    // ================= CONSULTATION DATA =================

    const consultationData = {

      appointment: {
        appointmentId:
          appointment.appointmentId,
      },

      symptoms: form.symptoms,

      diagnosis: form.diagnosis,

      notes: form.notes,

      bloodPressure:
        form.bloodPressure,

      temperature:
        form.temperature,

      pulse: form.pulse,
    };

    // ================= SAVE CONSULTATION + PRESCRIPTION =================

    await doctorApi.post(
      "/consultation",
      {

        consultation:
          consultationData,

        prescriptions:
          prescriptions,

      }
    );

    // ================= COMPLETE APPOINTMENT =================

    await doctorApi.put(
      `/appointment/complete/${appointment.appointmentId}`
    );

    alert(
      "Consultation Saved Successfully ✅"
    );

    navigate("/doctordashboard");

  } catch (err) {

    console.error(err);

    alert("Failed ❌");
  }
};

  useEffect(() => {

  const loadMedicalHistory = async () => {

    try {

      console.log("Appointment:", appointment);

      const patientId = appointment?.patientId;

      console.log("Patient ID:", patientId);

      if (!patientId) return;

      const res = await doctorApi.get(
        `/medical-history/${patientId}`
      );

      console.log("Medical History:", res.data);

      setMedicalHistory(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  loadMedicalHistory();

}, []);

const loadMedicines = async () => {

  try {

    const res = await doctorApi.get(
      "/medicine"
    );

    setMedicines(res.data);

  } catch (err) {

    console.error(err);

  }
};

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h1 className="text-3xl font-bold text-blue-700">
          Consultation Form
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500 text-sm">Patient</p>
            <p className="font-semibold text-lg">
              {appointment.fullName}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Disease</p>
            <p className="font-semibold text-lg">
              {appointment.disease}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Mode</p>
            <p className="font-semibold text-lg">
              {appointment.type}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Token</p>
            <p className="font-semibold text-lg">
              #{appointment.tokenNumber}
            </p>
          </div>

        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {/* CONSULTATION */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
         {/* ================= ACTION BUTTONS ================= */}
<div className="flex justify-between items-center mb-6">

  <div>

    <h2 className="text-2xl font-bold text-gray-800">
      Consultation Workspace
    </h2>

    <p className="text-gray-500 mt-1">
      Review patient history and continue consultation
    </p>

  </div>

  <div className="flex gap-3">

    {/* SHOW ONLY IF HISTORY NOT EXISTS */}
    {!medicalHistory && (

      <button
        type="button"
        onClick={() =>
          navigate("/medical-history-form", {
            state: {
              patient: {
                patientId: appointment.patientId,
                fullName: appointment.fullName,
                gender: appointment.gender,
                age: appointment.age,
              },
            },
          })
        }
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-xl font-medium shadow"
      >
        + Add Medical History
      </button>

    )}

    <button
      type="button"
      onClick={() =>
        navigate("/doctor/emr", {
          state: {
            patientId: appointment.patientId,
          },
        })
      }
      className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2.5 rounded-xl font-medium shadow"
    >
      Open EMR Timeline
    </button>

  </div>

</div>

{/* ================= MEDICAL HISTORY ================= */}

{!medicalHistory ? (

  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">

    <div className="flex items-center gap-3">

      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
        ⚠️
      </div>

      <div>

        <h3 className="text-lg font-semibold text-yellow-800">
          No Medical History Available
        </h3>

        <p className="text-yellow-700 text-sm mt-1">
          Add patient medical history before consultation for better diagnosis.
        </p>

      </div>

    </div>

  </div>

) : (

  <div className="bg-white border border-red-100 rounded-2xl shadow-sm p-8 mb-8">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">

      <div>

        <h2 className="text-2xl font-bold text-red-700">
          Patient Medical History
        </h2>

        <p className="text-gray-500 mt-1">
          Existing medical records and risk indicators
        </p>

      </div>

      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold">
        EMR Record Available
      </div>

    </div>

    {/* CONTENT */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ALLERGIES */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Allergies
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.allergies || "-"}
        </p>

      </div>

      {/* CHRONIC */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Chronic Diseases
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.chronicDiseases || "-"}
        </p>

      </div>

      {/* BLOOD GROUP */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Blood Group
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.bloodGroup || "-"}
        </p>

      </div>

      {/* SMOKING */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Smoking Status
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.smokingStatus || "-"}
        </p>

      </div>

      {/* ALCOHOL */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Alcohol Consumption
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.alcoholStatus || "-"}
        </p>

      </div>

      {/* SURGERIES */}
      <div className="bg-gray-50 rounded-xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Past Surgeries
        </p>

        <p className="font-semibold text-gray-800 text-lg">
          {medicalHistory.pastSurgeries || "-"}
        </p>

      </div>

    </div>

  </div>

)}

          <h2 className="text-2xl font-bold mb-6">
            Consultation Details
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Symptoms
              </label>

              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Diagnosis
              </label>

              <textarea
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="4"
              />
            </div>

            <div className="space-y-4">

              <div>
                <label className="block mb-2 font-medium">
                  Blood Pressure
                </label>

                <input
                  type="text"
                  name="bloodPressure"
                  value={form.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Temperature
                </label>

                <input
                  type="text"
                  name="temperature"
                  value={form.temperature}
                  onChange={handleChange}
                  placeholder="98.6°F"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Pulse
                </label>

                <input
                  type="text"
                  name="pulse"
                  value={form.pulse}
                  onChange={handleChange}
                  placeholder="72 bpm"
                  className="w-full border rounded-lg p-3"
                />
              </div>

            </div>

          </div>
        </div>

        {/* PRESCRIPTION */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Prescription
            </h2>

            <button
              type="button"
              onClick={addPrescription}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Medicine
            </button>
          </div>

          {prescriptions.map((p, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 mb-5 bg-gray-50"
            >

              <div className="grid grid-cols-2 gap-4">

                <select
  value={p.medicineName}
  onChange={(e) =>
    handlePrescriptionChange(
      index,
      "medicineName",
      e.target.value
    )
  }
  className="border rounded-lg p-3"
  required
>

  <option value="">
    Select Medicine
  </option>

  {medicines.map((m) => (

    <option
      key={m.medicineId}
      value={m.medicineName}
    >
      {m.medicineName}
      {" "}
      (Stock:
      {m.stockQuantity})
    </option>

  ))}

</select>

                <input
                  type="text"
                  placeholder="Dosage"
                  value={p.dosage}
                  onChange={(e) =>
                    handlePrescriptionChange(
                      index,
                      "dosage",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                  required
                />

                <input
                  type="text"
                  placeholder="Timing"
                  value={p.timing}
                  onChange={(e) =>
                    handlePrescriptionChange(
                      index,
                      "timing",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                />

                <input
                  type="number"
                  placeholder="Days"
                  value={p.days}
                  onChange={(e) =>
                    handlePrescriptionChange(
                      index,
                      "days",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3"
                />

                <textarea
                  placeholder="Notes"
                  value={p.notes}
                  onChange={(e) =>
                    handlePrescriptionChange(
                      index,
                      "notes",
                      e.target.value
                    )
                  }
                  className="border rounded-lg p-3 col-span-2"
                  rows="2"
                />

              </div>

              {prescriptions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePrescription(index)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              )}

            </div>
          ))}

        </div>

        {/* SAVE */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
        >
          Save Consultation
        </button>

      </form>

    </div>
  );
}