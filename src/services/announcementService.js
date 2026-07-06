import { supabase } from "../lib/supabase";

// Create Announcement
export async function createAnnouncement(announcement) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase
    .from("announcements")
    .insert({
      ...announcement,
      created_by: user.id,
    });

  if (error) throw error;

  return true;
}

// Get All Announcements
export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Get Latest Announcements
export async function getLatestAnnouncements(limit = 5) {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}

// Update Announcement
export async function updateAnnouncement(id, updates) {
  const { error } = await supabase
    .from("announcements")
    .update(updates)
    .eq("id", id);

  if (error) throw error;

  return true;
}

// Delete Announcement
export async function deleteAnnouncement(id) {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

// Pin Announcement
export async function pinAnnouncement(id) {
  const { error } = await supabase
    .from("announcements")
    .update({
      pinned: true,
    })
    .eq("id", id);

  if (error) throw error;

  return true;
}

// Unpin Announcement
export async function unpinAnnouncement(id) {
  const { error } = await supabase
    .from("announcements")
    .update({
      pinned: false,
    })
    .eq("id", id);

  if (error) throw error;

  return true;
}

export async function getLatestAnnouncement() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return data;
}