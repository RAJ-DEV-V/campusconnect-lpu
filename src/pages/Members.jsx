import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadMembers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setMembers(data);
    }

    loadMembers();
  }, []);

  const filteredMembers = members.filter((member) =>
    member.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <div className="mt-8 flex items-center justify-between">

          <h1 className="text-4xl font-bold">
            Members
          </h1>

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 rounded-xl border bg-white px-4 py-3 shadow-sm"
          />

        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    member.profile_photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.full_name || "User"
                    )}`
                  }
                  alt={member.full_name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>

                  <h2 className="text-xl font-bold">
                    {member.full_name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {member.branch}
                  </p>

                  <p className="text-sm text-slate-500">
                    Batch {member.graduation_year}
                  </p>

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  LinkedIn
                </a>

                <button
                  className="rounded-xl border px-4 py-3 transition hover:bg-slate-100"
                >
                  View
                </button>

              </div>

            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center shadow">
              <h2 className="text-2xl font-bold">
                No members found
              </h2>

              <p className="mt-2 text-slate-500">
                Try searching with another name.
              </p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}