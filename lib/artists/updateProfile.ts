import { Database } from "@/lib/supabase/types";

export const updateProfile = async ({
  address,
  username,
  bio,
  instagram_username,
  telegram_username,
  twitter_username,
  farcaster_username,
}: Database["public"]["Tables"]["in_process_artists"]["Insert"]) => {
  await fetch("/api/profile/create", {
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
};
