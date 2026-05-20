import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorApi from "../../doctorApi";

export default function PatientMedicalHistoryForm() {

  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient;

  const [form, setForm] = useState({

    allergies: "",
    chronicDiseases: "",
    pastSurgeries: "",
    familyHistory: "",
    bloodGroup: "",
    smokingStatus: "",
    alcoholStatus: "",
    height: "",
    weight: "",
    notes: "",

  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await doctorApi.post("/medical-history", {

        patientId: patient.patientId,

        allergies: form.allergies,
        chronicDiseases: form.chronicDiseases,
        pastSurgeries: form.pastSurgeries,
        familyHistory: form.familyHistory,
        bloodGroup: form.bloodGroup,
        smokingStatus: form.smokingStatus,
        alcoholStatus: form.alcoholStatus,
        height: form.height,
        weight: form.weight,
        notes: form.notes,

      });

      alert("Medical History Saved ✅");

      navigate(-1);

    } catch (err) {

      console.error(err);

      alert("Failed ❌");
    }
  };

  if (!patient) {

    return (
      <div className="p-10 text-red-500">
        Patient data missing
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Patient Medical History
        </h1>

        {/* PATIENT INFO */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          <div>
            <p className="text-sm text-gray-500">
              Patient Name
            </p>

            <p className="font-semibold">
              {patient.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Gender
            </p>

            <p className="font-semibold">
              {patient.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Age
            </p>

            <p className="font-semibold">
              {patient.age}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-5">

            {/* ALLERGIES */}
            <div>

              <label className="block mb-2 font-medium">
                Allergies
              </label>

              <textarea
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
              />

            </div>

            {/* CHRONIC */}
            <div>

              <label className="block mb-2 font-medium">
                Chronic Diseases
              </label>

              <textarea
                name="chronicDiseases"
                value={form.chronicDiseases}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
              />

            </div>

            {/* SURGERIES */}
            <div>

              <label className="block mb-2 font-medium">
                Past Surgeries
              </label>

              <textarea
                name="pastSurgeries"
                value={form.pastSurgeries}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
              />

            </div>

            {/* FAMILY HISTORY */}
            <div>

              <label className="block mb-2 font-medium">
                Family History
              </label>

              <textarea
                name="familyHistory"
                value={form.familyHistory}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="3"
              />

            </div>

            {/* BLOOD GROUP */}
            <div>

              <label className="block mb-2 font-medium">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >

                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>

              </select>

            </div>

            {/* SMOKING */}
            <div>

              <label className="block mb-2 font-medium">
                Smoking Status
              </label>

              <select
                name="smokingStatus"
                value={form.smokingStatus}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >

                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Former Smoker</option>

              </select>

            </div>

            {/* ALCOHOL */}
            <div>

              <label className="block mb-2 font-medium">
                Alcohol Status
              </label>

              <select
                name="alcoholStatus"
                value={form.alcoholStatus}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >

                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Occasional</option>

              </select>

            </div>

            {/* HEIGHT */}
            <div>

              <label className="block mb-2 font-medium">
                Height (cm)
              </label>

              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* WEIGHT */}
            <div>

              <label className="block mb-2 font-medium">
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* NOTES */}
            <div className="col-span-2">

              <label className="block mb-2 font-medium">
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                rows="4"
              />

            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-8">

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold"
            >
              Save Medical History
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}