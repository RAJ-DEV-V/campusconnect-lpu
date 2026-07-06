import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { signOut } from "../../services/auth";
import { getPendingRequestCount } from "../../services/connectionService";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      const count = await getPendingRequestCount();
      setPendingCount(count);
    }

    loadCount();
  }, []);

  async function handleLogout() {
    await signOut();
    navigate("/landing");
  }

  const navButton = (path, icon, label, badge = null) => (
    <button
      onClick={() => navigate(path)}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition ${
        location.pathname === path
          ? "bg-blue-600 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      <span>
        {icon} {label}
      </span>

      {badge}
    </button>
  );

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-6">

      <h1
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer text-2xl font-bold text-blue-600"
      >
        CampusConnect
      </h1>

      <nav className="mt-10 flex-1 space-y-3">

        {navButton("/dashboard", "🏠", "Dashboard")}

        {navButton("/members", "👥", "Members")}

        {navButton(
          "/requests",
          "🔔",
          "Requests",
          pendingCount > 0 ? (
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              {pendingCount}
            </span>
          ) : null
        )}

        {navButton("/network", "🤝", "My Network")}

        {navButton("/community", "🌐", "Community")}

        {navButton("/admin", "👑", "Admin Panel")}

        {navButton("/my-profile", "👤", "My Profile")}

        {navButton("/settings", "⚙️", "Settings")}

      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
      >
        🚪 Logout
      </button>

    </aside>
  );
}