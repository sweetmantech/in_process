import { IN_PROCESS_API } from "@/lib/consts";
import { Database } from "@/lib/supabase/types";

const updateProfile = async ({
  address,
  username,
  bio,
  instagram_username,
  telegram_username,
  twitter_username,
  farcaster_username,
}: Database["public"]["Tables"]["in_process_artists"]["Insert"]) => {
  try {
    const res = await fetch(`${IN_PROCESS_API}/profile/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        address,
        username,
        bio,
        instagram_username,
        telegram_username,
        twitter_username,
        farcaster_username,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `HTTP ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};

export default updateProfile;
