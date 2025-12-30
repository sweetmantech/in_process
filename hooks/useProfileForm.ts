import { Address } from "viem";
import { useArtistProfile } from "./useArtistProfile";
import { useEffect, useState } from "react";

const useProfileForm = (address: Address | undefined) => {
  const { data, isLoading } = useArtistProfile(address);

  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [farcaster, setFarcaster] = useState<string>("");

  useEffect(() => {
    setUserName(data?.username || "");
    setBio(data?.bio || "");
    setTwitter(data?.twitter_username || "");
    setInstagram(data?.instagram_username || "");
    setFarcaster(data?.farcaster_username || "");
    setTelegram(data?.telegram_username || "");
  }, [data]);

  return {
    username,
    setUserName,
    bio,
    setBio,
    twitter,
    setTwitter,
    telegram,
    instagram,
    setTelegram,
    setInstagram,
    farcaster,
    setFarcaster,
    isLoading,
  };
};

export default useProfileForm;
