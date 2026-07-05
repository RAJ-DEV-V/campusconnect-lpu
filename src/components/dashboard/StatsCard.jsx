import { useEffect, useState } from "react";
import { getMemberCount } from "../../services/dashboardService";

export default function StatsCard() {
  const [members, setMembers] = useState(0);

  useEffect(() => {
    async function loadData() {
      const total = await getMemberCount();
      setMembers(total);
    }

    loadData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-slate-500">Members</h3>
        <p className="mt-2 text-3xl font-bold">{members}</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-slate-500">Connections</h3>
        <p className="mt-2 text-3xl font-bold">0</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-slate-500">Profile</h3>
        <p className="mt-2 text-3xl font-bold">100%</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-slate-500">Community</h3>
        <p className="mt-2 text-3xl font-bold">Join</p>
      </div>

    </div>
  );
}