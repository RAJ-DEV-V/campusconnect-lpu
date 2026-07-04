import { supabase } from "../lib/supabase";

export async function saveProfile(profile) {
    const { data, error } = await supabase
        .from("profiles")
        .upsert(profile)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getProfile(id) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    if (error && error.code !== "PGRST116") {
        throw error;
    }

    return data;
}