import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import LatestAnnouncement from "../components/dashboard/LatestAnnouncement";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Browse Members",
      icon: "👥",
      path: "/members",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "My Network",
      icon: "🤝",
      path: "/network",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Community",
      icon: "🌐",
      path: "/community",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "My Profile",
      icon: "👤",
      path: "/my-profile",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 space-y-8 p-8">

        <Topbar />

        <WelcomeCard />

        <StatsCard />

        {/* Quick Actions */}

        <div>

          <h2 className="mb-5 text-2xl font-bold">
            ⚡ Quick Actions
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className="rounded-3xl bg-white p-6 text-left shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-3xl text-white`}
                >
                  {action.icon}
                </div>

                <h3 className="text-xl font-bold">
                  {action.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  Open {action.title}
                </p>
              </button>
            ))}

          </div>

        </div>

        {/* Latest Announcement */}

        <LatestAnnouncement />

        {/* Upcoming Event */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            🎉 Upcoming Event
          </h2>

          <div className="mt-5 rounded-2xl border-l-4 border-green-600 bg-slate-50 p-6">

            <h3 className="text-xl font-semibold">
              No upcoming events
            </h3>

            <p className="mt-2 text-slate-500">
              Events created by admins will appear here.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}