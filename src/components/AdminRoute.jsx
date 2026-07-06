import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUserRole } from "../services/roleService";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadRole() {
      const userRole = await getCurrentUserRole();
      setRole(userRole);
      setLoading(false);
    }

    loadRole();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (role !== "super_admin" && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}