import { useEffect, useState } from "react";

import {
  getConnectionStatus,
  sendConnectionRequest,
} from "../services/connectionService";

export default function ConnectionButton({ userId }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    loadStatus();
  }, [userId]);

  async function loadStatus() {
    const s = await getConnectionStatus(userId);
    setStatus(s);
  }

  async function handleConnect() {
    await sendConnectionRequest(userId);
    setStatus("pending");
  }

  if (status === "loading") {
    return (
      <button className="rounded-xl bg-slate-300 px-5 py-3">
        Loading...
      </button>
    );
  }

  if (status === "connected") {
    return (
      <button
        disabled
        className="rounded-xl bg-green-600 px-5 py-3 text-white"
      >
        ✅ Connected
      </button>
    );
  }

  if (status === "pending") {
    return (
      <button
        disabled
        className="rounded-xl bg-yellow-500 px-5 py-3 text-white"
      >
        ⏳ Pending
      </button>
    );
  }

  if (status === "received") {
    return (
      <button
        className="rounded-xl bg-blue-600 px-5 py-3 text-white"
      >
        View Request
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
    >
      + Connect
    </button>
  );
}