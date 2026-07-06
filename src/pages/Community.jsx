import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getAnnouncements } from "../services/announcementService";

export default function Community() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <h1 className="text-4xl font-bold">
          🌐 Community
        </h1>

        <p className="mt-2 text-slate-500">
          Stay updated with everything happening at CampusConnect.
        </p>

        <div className="mt-10 space-y-6">

          {announcements.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 shadow text-center">
              <h2 className="text-2xl font-bold">
                No announcements yet
              </h2>

              <p className="mt-2 text-slate-500">
                Check back later for updates.
              </p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-3xl bg-white p-8 shadow"
              >
                {announcement.pinned && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    📌 Pinned
                  </span>
                )}

                <h2 className="mt-4 text-2xl font-bold">
                  {announcement.title}
                </h2>

                <p className="mt-4 text-slate-600">
                  {announcement.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700">
                    {announcement.category}
                  </span>

                  <span className="text-sm text-slate-500">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>

                </div>

              </div>
            ))
          )}

        </div>

      </main>

    </div>
  );
}