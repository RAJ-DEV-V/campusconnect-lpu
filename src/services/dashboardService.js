import { supabase } from "../lib/supabase";

export async function getMemberCount() {
  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(error);
    return 0;
  }

  return count;
}