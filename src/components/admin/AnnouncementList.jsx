import { useEffect, useState } from "react";
import { getAnnouncements } from "../../services/announcementService";

export default function AnnouncementList() {
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
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="mb-6 text-3xl font-bold">
        📢 Published Announcements
      </h2>

      {announcements.length === 0 && (
        <p className="text-slate-500">
          No announcements published yet.
        </p>
      )}

      <div className="space-y-4">

        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="rounded-xl border p-5"
          >
            <h3 className="text-xl font-bold">
              {announcement.title}
            </h3>

            <p className="mt-2 text-slate-600">
              {announcement.description}
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">
                {announcement.category}
              </span>

              {announcement.pinned && (
                <span className="rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  📌 Pinned
                </span>
              )}

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}