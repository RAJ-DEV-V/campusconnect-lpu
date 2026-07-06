import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { sendConnectionRequest } from "../services/connectionService";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, [id]);

  async function handleConnect() {
    if (!profile) return;

    if (currentUser?.id === profile.id) {
      alert("You cannot connect with yourself.");
      return;
    }

    try {
      setSending(true);

      await sendConnectionRequest(profile.id);

      alert("✅ Connection request sent!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSending(false);
    }
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar />

        <button
          onClick={() => navigate(-1)}
          className="mb-6 rounded-xl border bg-white px-4 py-2 hover:bg-slate-100"
        >
          ← Back
        </button>

        <div className="rounded-3xl bg-white p-8 shadow">
          <div className="flex items-center gap-8">
            <img
              src={
                profile.profile_photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.full_name || "User"
                )}`
              }
              alt={profile.full_name}
              className="h-32 w-32 rounded-full object-cover"
            />

            <div>
              <h1 className="text-4xl font-bold">
                {profile.full_name}
              </h1>

              <p className="mt-2 text-slate-500">
                {profile.branch}
              </p>

              <p className="text-slate-500">
                Batch {profile.graduation_year}
              </p>

              <p className="mt-4">
                {profile.headline || "No headline added."}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold">
              About
            </h2>

            <p className="mt-3 text-slate-600">
              {profile.bio || "No bio available."}
            </p>
          </div>

          <div className="mt-10 flex gap-4">

            {profile.linkedin_url ? (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                LinkedIn
              </a>
            ) : (
              <button
                disabled
                className="rounded-xl bg-slate-400 px-6 py-3 font-semibold text-white cursor-not-allowed"
              >
                No LinkedIn
              </button>
            )}

            <button
              onClick={handleConnect}
              disabled={sending || currentUser?.id === profile.id}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
            >
              {currentUser?.id === profile.id
                ? "Your Profile"
                : sending
                ? "Sending..."
                : "+ Connect"}
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}