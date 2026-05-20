import adminApi from "../adminApi";
import doctorApi from "../doctorApi";

export const Services = {

  // ================= LOGIN =================
  loginAdmin: async (data) => {
    const res = await adminApi.post("/admin/login", data);
    localStorage.setItem("adminToken", res.data.token);
    return res.data;
  },

  getDoctor: async (data) => {
    const res = await doctorApi.post("/doctor/login", data);
    localStorage.setItem("doctorToken", res.data.token);
    return res.data;
  },

  // ================= ADMIN =================
  getPatients: async () => {
    const res = await adminApi.get("/patient");
    return res.data;
  },

  getDoctors: async () => {
    const res = await adminApi.get("/doctor/all");
    return res.data;
  },

  getAppointments: async () => {
    const res = await adminApi.get("/appointment");
    return res.data;
  },

  createAppointment: async (data) => {
    const res = await adminApi.post("/appointment", data);
    return res.data;
  },

  getSlots: async (doctorId, date) => {
    const res = await adminApi.get(`/appointment/slots?doctorId=${doctorId}&date=${date}`);
    return res.data;
  },

  cancelAppointment: async (id) => {
    const res = await adminApi.put(`/appointment/cancel/${id}`);
    return res.data;
  },


  // ================= DOCTOR =================
  

  getDoctorAppointmentsHistory: async (doctorId) => {
    const res = await doctorApi.get(`/doctor/appointments/history/${doctorId}`);
    return res.data;
  },

  
getDoctorAppointments: async (doctorId) => {
  return (await doctorApi.get(`/doctor/appointments/${doctorId}`)).data;
},

callNextPatient: async (doctorId) => {
  return (
    await doctorApi.put(
      `/doctor/queue/next/${doctorId}`
    )
  ).data;
},

  updateAppointmentStatus: async (id, status) => {
    if (status === "in-progress") {
      await doctorApi.put(`/appointment/start/${id}`);
      return true;
    }

    if (status === "completed") {
      await doctorApi.put(`/appointment/complete/${id}`);
      return true;
    }
  },
  getAppointmentHistory: async () => {
  const res = await adminApi.get("/appointment/history");
  return res.data;
},

deleteDoctor: async (id) => {
  const res = await adminApi.delete(`/doctor/${id}`);
  return res.data;
},

getDoctorById: async (id, role = "ADMIN") => {

  const api =
    role === "DOCTOR"
      ? doctorApi
      : adminApi;

  const endpoint =
    role === "DOCTOR"
      ? `/doctor/${id}`
      : `/admin/doctor/${id}`;

  const res = await api.get(endpoint);

  return res.data;
},

updateDoctor: async (id, data) => {
  const res = await adminApi.put(`/doctor/${id}`, data);
  return res.data;
},

// ================= PATIENT =================


addPatient: async (data) =>
  (await adminApi.post("/patient", data)).data,

deletePatient: async (id) =>
  (await adminApi.delete(`/patient/${id}`)).data,

updatePatient: async (id, data) =>
  (await adminApi.put(`/patient/${id}`, data)).data,

getPatientById: async (id) =>
  (await adminApi.get(`/patient/${id}`)).data,

getQueue: async (doctorId) => {
  return (
    await doctorApi.get(`/doctor/queue/${doctorId}`)
  ).data;
},

createDoctor: async (data) => {
  const res = await adminApi.post(
    "/doctor",
    data
  );

  return res.data;
},

};

export const saveMedicalHistory = async (data) => {

  const token = localStorage.getItem("doctorToken");

  const res = await axios.post(
    "http://localhost:1234/medical-history",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};