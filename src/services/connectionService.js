import { supabase } from "../lib/supabase";

/* ---------------- SEND CONNECTION REQUEST ---------------- */

export async function sendConnectionRequest(receiverId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  if (user.id === receiverId) {
    throw new Error("You cannot connect with yourself.");
  }

  const { data: existing } = await supabase
    .from("connections")
    .select("id")
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`
    )
    .maybeSingle();

  if (existing) {
    throw new Error("Connection request already exists.");
  }

  const { error } = await supabase
    .from("connections")
    .insert({
      sender_id: user.id,
      receiver_id: receiverId,
      status: "pending",
    });

  if (error) throw error;

  return true;
}

/* ---------------- CONNECTION STATUS ---------------- */

export async function getConnectionStatus(otherUserId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "none";

  const { data, error } = await supabase
    .from("connections")
    .select("*")
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
    )
    .maybeSingle();

  if (error || !data) {
    return "none";
  }

  if (data.status === "accepted") {
    return "connected";
  }

  if (data.status === "pending") {
    if (data.sender_id === user.id) {
      return "pending";
    }

    return "received";
  }

  if (data.status === "rejected") {
    return "none";
  }

  return "none";
}

/* ---------------- PENDING REQUESTS ---------------- */

export async function getPendingRequests() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("connections")
    .select(`
      id,
      status,
      sender:profiles!connections_sender_id_fkey(
        id,
        full_name,
        branch,
        graduation_year,
        profile_photo
      )
    `)
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) throw error;

  return data;
}

/* ---------------- ACCEPT ---------------- */

export async function acceptRequest(connectionId) {
  const { error } = await supabase
    .from("connections")
    .update({
      status: "accepted",
    })
    .eq("id", connectionId);

  if (error) throw error;

  return true;
}

/* ---------------- REJECT ---------------- */

export async function rejectRequest(connectionId) {
  const { error } = await supabase
    .from("connections")
    .update({
      status: "rejected",
    })
    .eq("id", connectionId);

  if (error) throw error;

  return true;
}

/* ---------------- PENDING COUNT ---------------- */

export async function getPendingRequestCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from("connections")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) {
    console.error(error);
    return 0;
  }

  return count || 0;
}

/* ---------------- MY CONNECTIONS ---------------- */

export async function getMyConnections() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("connections")
    .select(`
      id,
      sender_id,
      receiver_id,
      sender:profiles!connections_sender_id_fkey(
        id,
        full_name,
        branch,
        graduation_year,
        profile_photo
      ),
      receiver:profiles!connections_receiver_id_fkey(
        id,
        full_name,
        branch,
        graduation_year,
        profile_photo
      )
    `)
    .eq("status", "accepted")
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

  if (error) throw error;

  return data;
}