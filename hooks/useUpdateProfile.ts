import { useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import updateProfile from "@/lib/artists/updateProfile";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const { profile, artistWallet } = useUserProvider();
  const {
    twitter,
    instagram,
    farcaster,
    username,
    bio,
    telegram,
    setBio,
    setTwitter,
    setInstagram,
    setFarcaster,
    setTelegram,
    setUserName,
  } = profile;

  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    if (!artistWallet) {
      toast.error("Wallet not connected");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        address: artistWallet,
        username,
        bio,
        farcaster_username: extractSocialUsername(farcaster),
        twitter_username: extractSocialUsername(twitter),
        instagram_username: extractSocialUsername(instagram),
        telegram_username: extractSocialUsername(telegram),
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSave,
    twitter,
    instagram,
    farcaster,
    username,
    bio,
    telegram,
    setBio,
    setTwitter,
    setInstagram,
    setFarcaster,
    setTelegram,
    setUserName,
  };
};

export default useUpdateProfile;
