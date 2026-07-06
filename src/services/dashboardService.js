import { supabase } from "../lib/supabase";

export async function getDashboardStats() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  // Total Members
  const { count: members } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // My Accepted Connections
  const { count: connections } = await supabase
    .from("connections")
    .select("*", { count: "exact", head: true })
    .or(
      `and(sender_id.eq.${user.id},status.eq.accepted),and(receiver_id.eq.${user.id},status.eq.accepted)`
    );

  // Pending Requests
  const { count: pending } = await supabase
    .from("connections")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  // Total Announcements
  const { count: announcements } = await supabase
    .from("announcements")
    .select("*", { count: "exact", head: true });

  return {
    members: members || 0,
    connections: connections || 0,
    pending: pending || 0,
    announcements: announcements || 0,
  };
}