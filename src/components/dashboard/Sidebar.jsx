import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/auth";

export default function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/landing");
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-6">

      <h1
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer text-2xl font-bold text-blue-600"
      >
        CampusConnect
      </h1>

      <nav className="mt-10 flex-1 space-y-3">

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/members")}
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          👥 Members
        </button>

        <button
          onClick={() => navigate("/requests")}
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          🔔 Requests
        </button>

        <button
          onClick={() => navigate("/network")}
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          🤝 My Network
        </button>

        <button
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          🔍 Discover
        </button>

        <button
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          🌐 Community
        </button>

        <button
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          👤 My Profile
        </button>

        <button
          className="w-full rounded-xl py-3 transition hover:bg-slate-100"
        >
          ⚙️ Settings
        </button>

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