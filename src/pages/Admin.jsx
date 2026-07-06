import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import AnnouncementForm from "../components/admin/AnnouncementForm";
import AnnouncementList from "../components/admin/AnnouncementList";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <h1 className="text-4xl font-bold">
          👑 Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Manage CampusConnect from one place.
        </p>

        {/* Top Section */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <AnnouncementForm />

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              👥 User Management
            </h2>

            <p className="mt-3 text-slate-500">
              Promote admins, ban users, manage accounts and permissions.
            </p>

            <button
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Manage Users
            </button>

          </div>

        </div>

        {/* Published Announcements */}

        <div className="mt-10">

          <AnnouncementList />

        </div>

        {/* Bottom Section */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              🎉 Events
            </h2>

            <p className="mt-3 text-slate-500">
              Create and manage campus events.
            </p>

            <button
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Manage Events
            </button>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              📚 Materials
            </h2>

            <p className="mt-3 text-slate-500">
              Upload study materials, notes and PDFs.
            </p>

            <button
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Manage Materials
            </button>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              📊 Analytics
            </h2>

            <p className="mt-3 text-slate-500">
              Monitor members, connections and engagement.
            </p>

            <button
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              View Analytics
            </button>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">
              ⚠ Reports
            </h2>

            <p className="mt-3 text-slate-500">
              Review reports and moderate the community.
            </p>

            <button
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              View Reports
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}