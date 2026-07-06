import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";
import { saveProfile } from "../services/profileService";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }

    loadUser();
  }, []);

  async function handleSave() {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!linkedin.trim()) {
      alert("Please enter your LinkedIn profile.");
      return;
    }

    const linkedinRegex =
      /^https:\/\/(www\.)?linkedin\.com\/in\/.+$/i;

    if (!linkedinRegex.test(linkedin.trim())) {
      alert(
        "Please enter a valid LinkedIn profile URL.\n\nExample:\nhttps://www.linkedin.com/in/yourname"
      );
      return;
    }

    if (!branch) {
      alert("Please select your branch.");
      return;
    }

    if (!year) {
      alert("Please select your graduation year.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not logged in.");
      }

      await saveProfile({
        id: user.id,
        full_name: fullName.trim(),
        email: email,
        linkedin_url: linkedin.trim(),
        branch: branch,
        graduation_year: Number(year),
        profile_photo: user.user_metadata?.avatar_url || "",
        headline: "",
        bio: "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  }

  const isFormValid =
    fullName.trim() &&
    linkedin.trim() &&
    branch &&
    year;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-8">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="text-4xl font-bold">
          Complete Your Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Tell other LPU students about yourself.
        </p>

        <div className="mt-10 space-y-6">

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name *"
            className="w-full rounded-xl border p-4"
          />

          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-xl border bg-slate-100 p-4"
          />

          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn Profile URL *"
            className="w-full rounded-xl border p-4"
          />

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full rounded-xl border p-4"
          >
            <option value="">Select Branch *</option>
            <option>CSE</option>
            <option>AI & ML</option>
            <option>IT</option>
            <option>ECE</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Biotech</option>
            <option>BBA</option>
            <option>LLB</option>
            <option>Other</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border p-4"
          >
            <option value="">Graduation Year *</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030</option>
          </select>

          <button
            onClick={handleSave}
            disabled={loading || !isFormValid}
            className={`w-full rounded-xl py-4 font-semibold text-white transition ${
              loading || !isFormValid
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </div>

      </div>

    </div>
  );
}