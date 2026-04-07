import { Address } from "viem";
import fetchArtistProfile from "@/lib/fetchArtistProfile";
import updateProfile from "@/lib/artists/updateProfile";

const migrateProfile = async (
  socialWalletAddress: Address,
  externalWalletAddress: Address
): Promise<void> => {
  try {
    const profile = await fetchArtistProfile(socialWalletAddress);

    await updateProfile({
      address: externalWalletAddress,
      username: profile.username || "",
      bio: profile.bio || "",
      twitter_username: profile.twitter_username || "",
      instagram_username: profile.instagram_username || "",
      farcaster_username: profile.farcaster_username || "",
      telegram_username: profile.telegram_username || "",
    });

    updateProfile({
      address: socialWalletAddress,
      username: "",
      bio: "",
      twitter_username: "",
      instagram_username: "",
      farcaster_username: "",
      telegram_username: "",
    });
  } catch (error) {
    console.error("Failed to migrate profile:", error);
  }
};

export default migrateProfile;
