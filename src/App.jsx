import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Homepage";
import { Login } from "./pages/Login";
import Doctors from "./pages/Doctors";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Patients from "./pages/admin/PatientList";
import Appointments from "./pages/admin/AppointmentList";
import DoctorList from "./pages/admin/DoctorList";
import AppointmentBooking from "./pages/admin/AppointmentBooking";
import AdminLayout from "./pages/admin/AdminLayout";
import EditDoctor from "./pages/admin/EditDoctor";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

import ConsultationForm from "./pages/doctor/ConsultationForm";
import PatientMedicalHistoryForm from "./pages/doctor/PatientMedicalHistoryForm";
import PatientEMR from "./pages/doctor/PatientEMR";
import AddDoctor from "./pages/admin/AddDoctor";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/doctorlogin" element={<Doctors />} />

        {/* ADMIN */}
        <Route
  path="/admin"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminLayout />
    </ProtectedRoute>
  }
>

  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="patients"
    element={<Patients />}
  />

  <Route
    path="appointments"
    element={<Appointments />}
  />

  <Route
    path="doctors"
    element={<DoctorList />}
  />

  <Route
    path="book-appointment"
    element={<AppointmentBooking />}
  />

  <Route
    path="add-doctor"
    element={<AddDoctor />}
  />

  <Route
    path="edit-doctor/:id"
    element={<EditDoctor />}
  />

</Route>

        {/* DOCTOR */}
        <Route
          path="/doctordashboard"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/doctor/consultation"
  element={
    <ProtectedRoute role="DOCTOR">
      <ConsultationForm />
    </ProtectedRoute>
  }
/>

<Route
  path="/medical-history-form"
  element={<PatientMedicalHistoryForm />}
/>

<Route
  path="/doctor/emr"
  element={<PatientEMR />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;