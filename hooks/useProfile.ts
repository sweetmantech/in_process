import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";
import truncateAddress from "@/lib/truncateAddress";
import { useUserProvider } from "@/providers/UserProvider";
import { Database } from "@/lib/supabase/types";

export const saveIndentify = async ({
  address,
  username,
  bio,
  instagram_username,
  telegram_username,
  twitter_username,
  farcaster_username,
}: Database["public"]["Tables"]["in_process_artists"]["Row"]) => {
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
  const usernameRef = useRef() as any;
  const bioRef = useRef() as any;
  const statusRef = useRef() as any;
  const socialRef = useRef() as any;
  const { getProfile, connectedAddress } = useUserProvider();
  const { data, isLoading } = useArtistProfile(artistAddress);
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const searchParams = useSearchParams();
  const canEdit =
    connectedAddress?.toLowerCase() === new String((artistAddress as string) || "").toLowerCase() &&
    Boolean(connectedAddress);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const toggleEditing = () => setIsEditing(!isEditing);
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

  useEffect(() => {
    if (searchParams.get("editing") === "true" && canEdit) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [canEdit, searchParams, artistAddress]);

  useEffect(() => {
    if (!usernameRef.current || !bioRef.current || !statusRef.current || !socialRef.current) return;
    if (!isEditing) return;
    const handleMouseDown = async (e: MouseEvent) => {
      if (
        usernameRef.current.contains(e.target) ||
        bioRef.current.contains(e.target) ||
        statusRef.current.contains(e.target) ||
        socialRef.current.contains(e.target)
      )
        return;
      setSaving(true);
      await saveIndentify({
        address: artistAddress as Address,
        username,
        bio,
        instagram_username: instagram,
        twitter_username: twitter,
        farcaster_username: farcaster,
        telegram_username: telegram,
      });
      setTimeout(() => {
        toggleEditing();
        setSaving(false);
        getProfile();
      }, 500);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isEditing, twitter, instagram, telegram, bio, username]);

  return {
    canEdit,
    isEditing,
    toggleEditing,
    username,
    setUserName,
    bio,
    setBio,
    isLoading,
    saving,
    setSaving,
    usernameRef,
    bioRef,
    statusRef,
    twitter,
    telegram,
    instagram,
    setTwitter,
    setTelegram,
    setInstagram,
    socialRef,
    farcaster,
    setFarcaster,
  };
};

export default useProfile;
