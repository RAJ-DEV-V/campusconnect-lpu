import { supabase } from "../lib/supabase";

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

export async function acceptRequest(connectionId) {
  const { error } = await supabase
    .from("connections")
    .update({
      status: "accepted",
    })
    .eq("id", connectionId);

  if (error) throw error;
}

export async function rejectRequest(connectionId) {
  const { error } = await supabase
    .from("connections")
    .update({
      status: "rejected",
    })
    .eq("id", connectionId);

  if (error) throw error;
}