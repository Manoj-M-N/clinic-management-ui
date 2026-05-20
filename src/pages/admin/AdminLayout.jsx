import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    navigate("/adminlogin");
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#07122B] text-white flex flex-col">

        {/* LOGO */}
        <div className="p-6 border-b border-gray-800">

          <h1 className="text-3xl font-bold">
            Admin Panel
          </h1>

        </div>

        {/* MENU */}
        <nav className="flex-1 p-5 space-y-3">

          <Link
            to="/admin/dashboard"
            className="block px-4 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/patients"
            className="block px-4 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            👨‍⚕️ Patients
          </Link>

          <Link
            to="/admin/appointments"
            className="block px-4 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            📅 Appointments
          </Link>

          <Link
            to="/admin/doctors"
            className="block px-4 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            🩺 Doctors
          </Link>

          <Link
            to="/admin/book-appointment"
            className="block px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            ➕ Book Appointment
          </Link>

          <Link
  to="/admin/medicines"
  className="block px-4 py-3 rounded-xl hover:bg-blue-600 transition"
>
  💊 Medicines
</Link>

        </nav>

        {/* LOGOUT */}
        <div className="p-5 border-t border-gray-800">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {/* TOPBAR */}
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

          <h2 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h2>

          <div className="font-medium text-gray-700">
            Welcome Admin 👋
          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">

          {/* 🔥 IMPORTANT */}
          <Outlet />

        </div>

      </main>

    </div>
  );
}