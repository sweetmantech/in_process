import { supabase } from "@/lib/supabase/client";

export async function updatePhoneVerified(phone_number: string) {
  const { data, error } = await supabase
    .from("in_process_artist_phones")
    .update({ verified: true })
    .eq("phone_number", phone_number)
    .select();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
