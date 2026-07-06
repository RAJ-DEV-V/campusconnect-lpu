import { useEffect, useState } from "react";
import { getLatestAnnouncement } from "../../services/announcementService";

export default function LatestAnnouncement() {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    loadAnnouncement();
  }, []);

  async function loadAnnouncement() {
    const data = await getLatestAnnouncement();
    setAnnouncement(data);
  }

  if (!announcement) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold">
          📢 Latest Announcement
        </h2>

        <div className="mt-6 rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-6">

          <h3 className="text-xl font-semibold">
            No announcements yet
          </h3>

          <p className="mt-2 text-slate-500">
            Admin announcements will appear here.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="text-2xl font-bold">
        📢 Latest Announcement
      </h2>

      <div className="mt-6 rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-6">

        {announcement.pinned && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            📌 Pinned
          </span>
        )}

        <h3 className="mt-4 text-2xl font-bold">
          {announcement.title}
        </h3>

        <p className="mt-3 text-slate-600">
          {announcement.description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {announcement.category}
          </span>

          <span className="text-sm text-slate-500">
            {new Date(announcement.created_at).toLocaleDateString()}
          </span>

        </div>

      </div>

    </div>
  );
}