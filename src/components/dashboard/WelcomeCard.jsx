import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WelcomeCard() {
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
    <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-lg">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back,{" "}
          {user?.user_metadata?.full_name?.split(" ")[0] || "Student"} 👋
        </h1>

        <p className="mt-3 text-blue-100">
          Build meaningful connections with LPU students.
        </p>
      </div>

      <img
        src={
          user?.user_metadata?.avatar_url ||
          "https://ui-avatars.com/api/?name=User"
        }
        alt="Profile"
        className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
      />

    </div>
  );
}