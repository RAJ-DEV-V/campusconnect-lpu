import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  return (
    <header className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">

      <input
        placeholder="Search students..."
        className="w-96 rounded-xl border px-4 py-3"
      />

      <div className="flex items-center gap-4">

        <button className="text-2xl">🔔</button>

        <img
          src={
            user?.user_metadata?.avatar_url ||
            "https://ui-avatars.com/api/?name=User"
          }
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />

      </div>

    </header>
  );
}