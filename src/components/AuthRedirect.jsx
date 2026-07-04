import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/profileService";

export default function AuthRedirect() {
  const { user, loading } = useAuth();

  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      const profile = await getProfile(user.id);

      setHasProfile(!!profile);
      setCheckingProfile(false);
    }

    checkProfile();
  }, [user]);

  if (loading || checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  if (hasProfile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/profile-setup" replace />;
}