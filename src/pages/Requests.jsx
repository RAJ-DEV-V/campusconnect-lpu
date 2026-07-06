import { useEffect, useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import {
  getPendingRequests,
  acceptRequest,
  rejectRequest,
} from "../services/connectionService";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const data = await getPendingRequests();
      setRequests(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(id) {
    try {
      await acceptRequest(id);
      loadRequests();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function handleReject(id) {
    try {
      await rejectRequest(id);
      loadRequests();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <h1 className="text-4xl font-bold">
          Connection Requests
        </h1>

        {loading ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow">
            Loading...
          </div>
        ) : (
          <div className="mt-8 space-y-4">

            {requests.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center shadow">
                <h2 className="text-xl font-semibold">
                  No pending requests
                </h2>

                <p className="mt-2 text-slate-500">
                  When someone sends you a connection request,
                  it will appear here.
                </p>
              </div>
            )}

            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex items-center gap-4">

                  <img
                    src={
                      request.sender.profile_photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        request.sender.full_name
                      )}`
                    }
                    alt={request.sender.full_name}
                    className="h-14 w-14 rounded-full"
                  />

                  <div>

                    <h2 className="text-xl font-bold">
                      {request.sender.full_name}
                    </h2>

                    <p className="text-slate-500">
                      {request.sender.branch}
                    </p>

                    <p className="text-slate-500">
                      Batch {request.sender.graduation_year}
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleAccept(request.id)}
                    className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(request.id)}
                    className="rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}