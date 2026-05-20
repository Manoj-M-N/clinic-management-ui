import React, { useState, useEffect } from "react";
import { Services } from "../../service/service";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";

export default function AppointmentBooking() {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isNewPatient, setIsNewPatient] = useState(false);

  const navigate = useNavigate();

  // 🔥 NEW → TYPE
  const [type, setType] = useState("ONLINE");

  const [patientForm, setPatientForm] = useState({
    fullName: "",
    phone: "",
    gender: "",
    age: "",
    disease: "",
    admissionDate: ""
  });

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    type: "ONLINE"
  });

  // 🔥 LOAD
  useEffect(() => {
    Services.getPatients().then(setPatients);
    Services.getDoctors().then(setDoctors);
  }, []);

  // 🔍 SEARCH
  useEffect(() => {
    if (!search) return setFilteredPatients([]);

    const results = patients.filter(p =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    );

    setFilteredPatients(results);
  }, [search, patients]);

  // 🔥 LOAD SLOTS (ONLY ONLINE)
  useEffect(() => {
    if (type !== "ONLINE") return;
    if (!form.doctorId || !form.appointmentDate) return;

    const loadSlots = async () => {
      const res = await Services.getSlots(
        form.doctorId,
        form.appointmentDate
      );

      setSlots(res.slots || []);
      setBookedSlots(res.booked || []);
    };

    loadSlots();
  }, [form.doctorId, form.appointmentDate, type]);

  const formatTime = (t) => t?.slice(0, 5);

  // ✅ SELECT PATIENT
  const selectPatient = (p) => {
    setForm(prev => ({
  ...prev,
  patientId: p.patientId
}));
    setSearch(p.fullName);
    setFilteredPatients([]);
    setIsNewPatient(false);
  };

  // ➕ ADD PATIENT
  const handleAddPatient = async () => {

  if (
    !patientForm.fullName ||
    !patientForm.phone ||
    !patientForm.gender ||
    !patientForm.age
  ) {
    alert("⚠️ Fill required fields");
    return;
  }

  try {
    const res = await Services.addPatient(patientForm);

    alert("Patient added ✅");

    setForm(prev => ({
      ...prev,
      patientId: res.patientId
    }));

    setIsNewPatient(false);

    const updated = await Services.getPatients();
    setPatients(updated);

  } catch (err) {
    console.error(err);
    alert("Failed ❌");
  }
};

  // 📅 SUBMIT
  // 📅 SUBMIT
const handleSubmit = async () => {

  if (!form.patientId || !form.doctorId) {
    alert("⚠️ Select patient & doctor");
    return;
  }

  // ✅ GET SELECTED PATIENT
  const selectedPatient = patients.find(
    p => p.patientId === form.patientId
  );

  if (!selectedPatient) {
    alert("Patient not found");
    return;
  }

  // ✅ FULL PAYLOAD
  let payload = {
    patientId: selectedPatient.patientId,
    fullName: selectedPatient.fullName,
    phone: selectedPatient.phone,
    gender: selectedPatient.gender,
    age: selectedPatient.age,
    disease: patientForm.disease || selectedPatient.disease,
    doctorId: form.doctorId,
    appointmentDate: form.appointmentDate,
    appointmentTime: form.appointmentTime,
    type
  };

  // 🔥 WALK-IN
  if (type === "WALK_IN") {
    payload.appointmentDate =
      new Date().toISOString().slice(0, 10);

    payload.appointmentTime = null;
  }

  // 🔵 ONLINE VALIDATION
  if (type === "ONLINE") {

    if (!form.appointmentDate || !form.appointmentTime) {
      alert("⚠️ Select date & slot");
      return;
    }
  }

  try {

    console.log("PAYLOAD:", payload);

    await Services.createAppointment(payload);

    alert(
      type === "WALK_IN"
        ? "Walk-in registered ✅"
        : "Appointment booked ✅"
    );

    navigate("/admin/appointments");

  } catch (err) {

    console.error(err);

    alert(
      err?.response?.data ||
      "Booking failed ❌"
    );
  }
};

  return (
    <>

      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold">📅 Appointment Booking</h1>

        {/* 🔥 TYPE SWITCH */}
        <div className="flex gap-4">
          {["ONLINE", "WALK_IN"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded ${
                type === t ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 🔍 SEARCH */}
        <input
          placeholder="Search patient..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsNewPatient(false);
          }}
          className="w-full p-3 border rounded"
        />

        {filteredPatients.map(p => (
          <div
            key={p.patientId}
            onClick={() => selectPatient(p)}
            className="p-2 bg-white border cursor-pointer hover:bg-gray-100"
          >
            {p.fullName} - {p.phone}
          </div>
        ))}

        {search && filteredPatients.length === 0 && (
          <button
            onClick={() => setIsNewPatient(true)}
            className="text-blue-600"
          >
            + Add New Patient
          </button>
        )}

        {/* ➕ NEW PATIENT */}
        {isNewPatient && (
          <div className="bg-white p-4 rounded shadow grid grid-cols-2 gap-4">

            <input placeholder="Name"
              onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })} />

            <input placeholder="Phone"
              onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} />

            <select onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}>
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input placeholder="Age"
              onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} />

            <input placeholder="Disease"
              onChange={(e) => setPatientForm({ ...patientForm, disease: e.target.value })} />

            <input type="date"
              onChange={(e) => setPatientForm({ ...patientForm, admissionDate: e.target.value })} />

            <button onClick={handleAddPatient}
              className="col-span-2 bg-green-600 text-white p-2 rounded">
              Save Patient
            </button>

          </div>
        )}

        {/* 👨‍⚕️ DOCTORS */}
        <div className="grid grid-cols-3 gap-4">
          {doctors.map(d => (
            <div
              key={d.doctorId}
              onClick={() => setForm({ ...form, doctorId: d.doctorId })}
              className={`p-4 border rounded cursor-pointer ${
                form.doctorId === d.doctorId ? "bg-blue-100" : ""
              }`}
            >
              <h3>{d.doctorName}</h3>
              <p>{d.specialization}</p>
            </div>
          ))}
        </div>

        {/* 🔵 ONLINE ONLY */}
        {type === "ONLINE" && (
          <>
            <input
              type="date"
              className="border p-2"
              onChange={(e) =>
                setForm({ ...form, appointmentDate: e.target.value })
              }
            />

            <div className="grid grid-cols-4 gap-2">
              {slots.map(time => {
                const isBooked = bookedSlots.map(t => t.slice(0,5))
                  .includes(time.slice(0,5));

                return (
                  <button
                    key={time}
                    disabled={isBooked}
                    onClick={() =>
                      setForm({ ...form, appointmentTime: time })
                    }
                    className={`p-2 rounded ${
                      isBooked ? "bg-red-200" :
                      form.appointmentTime === time ? "bg-blue-600 text-white" :
                      "bg-gray-200"
                    }`}
                  >
                    {formatTime(time)}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* 🟢 WALK-IN INFO */}
        {type === "WALK_IN" && (
          <p className="text-green-600 font-medium">
            Walk-in: Token will be generated automatically
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Confirm Appointment
        </button>

      </div>

    </>
  );
}