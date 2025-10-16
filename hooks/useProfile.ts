import { useEffect, useRef, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";
import truncateAddress from "@/lib/truncateAddress";
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

const useProfile = (artistAddress?: Address) => {
  const { data, isLoading } = useArtistProfile(artistAddress);
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [farcaster, setFarcaster] = useState<string>("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    if (data) {
      setUserName(data.username || truncateAddress(artistAddress as string));
      setBio(data.bio || "");
      setTwitter(data.twitter_username || "");
      setTelegram(data.telegram_username || "");
      setInstagram(data.instagram_username || "");
      setFarcaster(data.farcaster_username || "");
    }
  }, [data, artistAddress]);

  return {
    username,
    setUserName,
    bio,
    setBio,
    isLoading,
    saving,
    setSaving,
    twitter,
    telegram,
    instagram,
    setTwitter,
    setTelegram,
    setInstagram,
    farcaster,
    setFarcaster,
  };
};

export default useProfile;
