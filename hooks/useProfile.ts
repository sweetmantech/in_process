import { useEffect, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";
import truncateAddress from "@/lib/truncateAddress";

const useProfile = (artistAddress?: Address) => {
  const { data, isLoading, refetch } = useArtistProfile(artistAddress);
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [farcaster, setFarcaster] = useState<string>("");
  const [telegram, setTelegram] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);

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
    if (data?.phone) {
      setPhoneNumber(data.phone.phone_number);
      setPhoneVerified(data.phone.verified);
      return;
    }
    setPhoneNumber("");
    setPhoneVerified(false);
  }, [data?.phone]);

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
    refetch,
    phoneNumber,
    phoneVerified,
    setPhoneVerified,
  };
};

export default useProfile;
