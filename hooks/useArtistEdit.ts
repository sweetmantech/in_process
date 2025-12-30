import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Address } from "viem";
import useArtistEditable from "./useArtistEditable";
import { updateProfile } from "@/lib/artists/updateProfile";
import useProfileForm from "./useProfileForm";

const useArtistEdit = (artistAddress: Address | undefined) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const profileForm = useProfileForm(artistAddress);
  const { username, bio, twitter, instagram, farcaster, telegram } = profileForm;
  const usernameRef = useRef(null) as any;
  const bioRef = useRef(null) as any;
  const statusRef = useRef(null) as any;
  const socialRef = useRef(null) as any;

  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isEditable } = useArtistEditable();

  const toggleEditing = () => setIsEditing(!isEditing);

  useEffect(() => {
    if (searchParams.get("editing") === "true" && isEditable) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isEditable, searchParams, artistAddress]);

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
      setIsUpdating(true);
      await updateProfile({
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
        setIsUpdating(false);
      }, 500);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isEditing, twitter, instagram, telegram, bio, username]);

  return {
    usernameRef,
    bioRef,
    statusRef,
    socialRef,
    isEditable,
    isEditing,
    toggleEditing,
    isUpdating,
    ...profileForm,
  };
};

export default useArtistEdit;
