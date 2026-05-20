import { useEffect, useState } from "react";
import { Services } from "../../service/service";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [search, setSearch] = useState("");
  const [doctor, setDoctor] = useState(null);

  const navigate = useNavigate();

  // ================= JWT =================
  const token = localStorage.getItem("doctorToken");

  const decoded = token ? jwtDecode(token) : null;

  const doctorId = decoded?.doctor_id;

  const doctorName =
    decoded?.name ||
    decoded?.doctorName ||
    "Doctor";

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem("doctorToken");

    navigate("/doctorlogin");
  };

  // ================= LOAD APPOINTMENTS =================
  const loadAppointments = async () => {

    try {

      if (!doctorId) return;

      const data =
        await Services.getDoctorAppointments(
          doctorId
        );

      setAppointments(data);

    } catch (err) {

      console.error(err);

    }
  };

  // ================= LOAD QUEUE =================
  const loadQueue = async () => {

    try {

      if (!doctorId) return;

      const data =
        await Services.getQueue(doctorId);

      setQueue(data);

    } catch (err) {

      console.error(err);

    }
  };
const loadDoctorProfile = async () => {

  try {

    const res =
      await Services.getDoctorById(
  doctorId,
  "DOCTOR"
)

    setDoctor(res);

  } catch (err) {

    console.error(err);

  }
};
 useEffect(() => {

  loadAppointments();
  loadQueue();
  loadDoctorProfile();

}, []);

  // ================= CALL NEXT =================
  const callNextPatient = async () => {

    try {

      const activePatient = appointments.find(
        (a) =>
          a.status === "called" ||
          a.status === "in_progress"
      );

      if (activePatient) {

        alert(
          "Complete current patient first"
        );

        return;
      }

      const res =
        await Services.callNextPatient(
          doctorId
        );

      if (res === "No patients available") {

        alert("No patients available");

        return;
      }

      await loadAppointments();
      await loadQueue();

    } catch (err) {

      console.error(err);

    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {

    try {

      await Services.updateAppointmentStatus(
        id,
        status
      );

      await loadAppointments();

    } catch (err) {

      console.error(err);

    }
  };

  // ================= FILTER =================
  const activeAppointments = appointments.filter(
    (a) =>
      a.status === "scheduled" ||
      a.status === "called" ||
      a.status === "in_progress"
  );

  const filteredAppointments =
    activeAppointments.filter((a) => {

      const name =
        a.fullName ||
        a.patient?.fullName ||
        "";

      return name
        .toLowerCase()
        .includes(search.toLowerCase());
    });

  // ================= COUNTS =================
  const totalPatients = appointments.length;

  const waitingPatients =
    appointments.filter(
      (a) => a.status === "scheduled"
    ).length;

  const completedPatients =
    appointments.filter(
      (a) => a.status === "completed"
    ).length;

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= TOP HEADER ================= */}
      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Doctor Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back,
              <span className="font-semibold text-blue-600 ml-1">
                Dr. {doctor?.doctorName || "Doctor"}
              </span>
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl font-medium"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-500">

            <p className="text-gray-500 text-sm">
              Total Appointments
            </p>

            <h2 className="text-4xl font-bold mt-2 text-gray-800">
              {totalPatients}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-500">

            <p className="text-gray-500 text-sm">
              Waiting Patients
            </p>

            <h2 className="text-4xl font-bold mt-2 text-gray-800">
              {waitingPatients}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500">

            <p className="text-gray-500 text-sm">
              Completed Consultations
            </p>

            <h2 className="text-4xl font-bold mt-2 text-gray-800">
              {completedPatients}
            </h2>

          </div>

        </div>

        {/* ================= QUEUE SECTION ================= */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Live Queue
              </h2>

              <p className="text-gray-500">
                Current patient waiting queue
              </p>

            </div>

            <button
              onClick={callNextPatient}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
            >
              Call Next Patient
            </button>

          </div>

          {queue.length === 0 ? (

            <div className="text-gray-400 text-center py-8">
              No patients in queue
            </div>

          ) : (

            <div className="flex gap-4 flex-wrap">

              {queue.map((q) => (

                <div
                  key={q.appointmentId}
                  className="bg-gray-100 border rounded-xl px-5 py-4 min-w-[180px]"
                >

                  <p className="text-sm text-gray-500">
                    Token
                  </p>

                  <h3 className="text-2xl font-bold text-blue-700">
                    #{q.tokenNumber}
                  </h3>

                  <p className="mt-2 font-medium text-gray-700">
                    {q.fullName}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ================= PATIENT LIST ================= */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          {/* HEADER */}
          <div className="p-6 border-b">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Active Patients
                </h2>

                <p className="text-gray-500">
                  Manage ongoing consultations
                </p>

              </div>

              <input
                type="text"
                placeholder="Search patient..."
                className="border rounded-xl px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left text-gray-600 text-sm uppercase">

                  <th className="px-6 py-4">
                    Patient
                  </th>

                  <th className="px-6 py-4">
                    Token
                  </th>

                  <th className="px-6 py-4">
                    Time
                  </th>

                  <th className="px-6 py-4">
                    Mode
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredAppointments.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400"
                    >
                      No active patients
                    </td>

                  </tr>

                ) : (

                  filteredAppointments.map((a) => (

                    <tr
                      key={a.appointmentId}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* PATIENT */}
                      <td className="px-6 py-5">

                        <div>

                          <p className="font-semibold text-gray-800">
                            {a.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {a.gender || "N/A"} • {a.age || "-"} yrs
                          </p>

                        </div>

                      </td>

                      {/* TOKEN */}
                      <td className="px-6 py-5">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold">
                          #{a.tokenNumber}
                        </span>

                      </td>

                      {/* TIME */}
                      <td className="px-6 py-5 text-gray-700">
                        {a.appointmentTime || "-"}
                      </td>

                      {/* MODE */}
                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            a.type === "WALK_IN"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-cyan-100 text-cyan-700"
                          }`}
                        >
                          {a.type === "WALK_IN"
                            ? "Walk-In"
                            : "Online"}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            a.status === "scheduled"
                              ? "bg-gray-100 text-gray-700"
                              : a.status === "called"
                              ? "bg-yellow-100 text-yellow-700"
                              : a.status === "in_progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {a.status.replace("_", " ")}
                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5 text-center">

                        {(a.status === "called" ||
                          a.status === "in_progress") && (

                          <button
                            onClick={async () => {

                              try {

                                if (
                                  a.status === "called"
                                ) {

                                  await updateStatus(
                                    a.appointmentId,
                                    "in_progress"
                                  );
                                }

                                navigate(
                                  "/doctor/consultation",
                                  {
                                    state: {
                                      appointment: {
                                        ...a,
                                        status:
                                          "in_progress",
                                      },
                                    },
                                  }
                                );

                              } catch (err) {

                                console.error(err);

                              }
                            }}
                            className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-xl font-medium"
                          >
                            {a.status === "called"
                              ? "Start Consultation"
                              : "Open Consultation"}
                          </button>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}