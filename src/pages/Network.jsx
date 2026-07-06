import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { supabase } from "../lib/supabase";

export default function Network() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("connections")
      .select(`
        *,
        sender:profiles!connections_sender_id_fkey(*),
        receiver:profiles!connections_receiver_id_fkey(*)
      `)
      .eq("status", "accepted")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

    if (error) {
      console.error(error);
      return;
    }

    setConnections(data || []);
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <h1 className="text-4xl font-bold">
          My Network
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {connections.length === 0 && (
            <div className="rounded-2xl bg-white p-8 shadow">
              No connections yet.
            </div>
          )}

          {connections.map((connection) => {
            const person =
              connection.sender_id === connection.receiver.id
                ? connection.sender
                : connection.receiver;

            return (
              <div
                key={connection.id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <img
                  src={
                    person.profile_photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      person.full_name
                    )}`
                  }
                  className="h-20 w-20 rounded-full"
                  alt={person.full_name}
                />

                <h2 className="mt-4 text-xl font-bold">
                  {person.full_name}
                </h2>

                <p className="text-slate-500">
                  {person.branch}
                </p>

              </div>
            );
          })}

        </div>

      </main>

    </div>
  );
}