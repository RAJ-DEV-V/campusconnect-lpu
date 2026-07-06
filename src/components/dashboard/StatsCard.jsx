import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboardService";
import StatCard from "./StatCard";

export default function StatsCard() {
  const [stats, setStats] = useState({
    members: 0,
    connections: 0,
    pending: 0,
    announcements: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Members"
        value={stats.members}
        icon="👥"
        color="blue"
      />

      <StatCard
        title="Connections"
        value={stats.connections}
        icon="🤝"
        color="green"
      />

      <StatCard
        title="Pending Requests"
        value={stats.pending}
        icon="🔔"
        color="orange"
      />

      <StatCard
        title="Announcements"
        value={stats.announcements}
        icon="📢"
        color="purple"
      />

    </div>
  );
}