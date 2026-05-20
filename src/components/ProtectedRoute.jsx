import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function ProtectedRoute({
  children,
  role,
}) {

  // ================= TOKEN =================
  const token =
    role === "ADMIN"
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("doctorToken");

  // ================= NO TOKEN =================
  if (!token) {

    return (
      <Navigate
        to={
          role === "ADMIN"
            ? "/adminlogin"
            : "/doctorlogin"
        }
        replace
      />
    );
  }

  try {

    const decoded = jwtDecode(token);

    const userRole =
      decoded.role ||
      decoded.authorities ||
      "";

    // ================= ROLE CHECK =================
    if (
      userRole !== role &&
      userRole !== `ROLE_${role}`
    ) {

      return (
        <Navigate
          to={
            role === "ADMIN"
              ? "/adminlogin"
              : "/doctorlogin"
          }
          replace
        />
      );
    }

    // ✅ IMPORTANT
    return children;

  } catch (err) {

    console.error(err);

    return (
      <Navigate
        to={
          role === "ADMIN"
            ? "/adminlogin"
            : "/doctorlogin"
        }
        replace
      />
    );
  }
}