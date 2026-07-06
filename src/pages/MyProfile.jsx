import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import { supabase } from "../lib/supabase";

export default function MyProfile() {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    full_name: "",
    headline: "",
    bio: "",
    linkedin_url: "",
    branch: "",
    graduation_year: "",
    profile_photo: "",
    role: "member",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
    }

    setLoading(false);
  }

  async function handleSave() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        headline: profile.headline,
        bio: profile.bio,
        linkedin_url: profile.linkedin_url,
        branch: profile.branch,
        graduation_year: profile.graduation_year,
      })
      .eq("id", user.id);

    alert("Profile updated successfully.");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <h1 className="text-4xl font-bold">
          👤 My Profile
        </h1>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">

          <div className="flex items-center gap-6">

            <img
              src={
                profile.profile_photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile.full_name
                )}`
              }
              className="h-28 w-28 rounded-full"
              alt=""
            />

            <div>

              <h2 className="text-3xl font-bold">
                {profile.full_name}
              </h2>

              <p className="text-slate-500">
                {profile.branch}
              </p>

              <p className="text-slate-500">
                Batch {profile.graduation_year}
              </p>

              <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {profile.role}
              </span>

            </div>

          </div>

          <div className="mt-10 space-y-5">

            <input
              value={profile.full_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4"
              placeholder="Full Name"
            />

            <input
              value={profile.headline || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  headline: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4"
              placeholder="Headline"
            />

            <textarea
              value={profile.bio || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              className="h-32 w-full rounded-xl border p-4"
              placeholder="Bio"
            />

            <input
              value={profile.linkedin_url || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedin_url: e.target.value,
                })
              }
              className="w-full rounded-xl border p-4"
              placeholder="LinkedIn URL"
            />

            <button
              onClick={handleSave}
              className="rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}