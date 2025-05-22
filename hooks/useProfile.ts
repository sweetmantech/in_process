import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";
import truncateAddress from "@/lib/truncateAddress";
import { useUserProvider } from "@/providers/UserProvider";

const saveIndentify = async (
  artistAddress: Address,
  username: string,
  bio: string,
) => {
  await fetch("/api/profile/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ walletAddress: artistAddress, username, bio }),
  });
};

const useProfile = () => {
  const usernameRef = useRef() as any;
  const bioRef = useRef() as any;
  const statusRef = useRef() as any;
  const { getProfile, connectedAddress } = useUserProvider();
  const { data, isLoading } = useArtistProfile();
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const { artistAddress } = useParams();
  const searchParams = useSearchParams();
  const canEdit =
    connectedAddress?.toLowerCase() ===
      new String((artistAddress as string) || "").toLowerCase() &&
    Boolean(connectedAddress);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const toggleEditing = () => setIsEditing(!isEditing);
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    if (data) {
      setUserName(data.username || truncateAddress(artistAddress as string));
      setBio(data?.bio || "");
      setTwitter(data.socials.twitter);
      setTelegram(data.socials.telegram);
      setInstagram(data.socials.instagram);
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
    if (!usernameRef.current || !bioRef.current || !statusRef.current) return;
    if (!isEditing) return;
    const handleMouseDown = async (e: MouseEvent) => {
      if (
        usernameRef.current.contains(e.target) ||
        bioRef.current.contains(e.target) ||
        statusRef.current.contains(e.target)
      )
        return;
      setSaving(true);
      await saveIndentify(
        artistAddress as Address,
        usernameRef.current.value,
        bioRef.current.value,
      );
      setTimeout(() => {
        toggleEditing();
        setSaving(false);
        getProfile();
      }, 500);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isEditing, usernameRef, bioRef, statusRef]);

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
  };
};

export default useProfile;
