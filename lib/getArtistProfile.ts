import { Address } from "viem";
import getEnsName from "./viem/getEnsName";
import getZoraProfile from "./zora/getZoraProfile";
import { getProfile } from "./supabase/in_process_artists/getProfile";

const getArtistProfile = async (address: string) => {
  const emptyFields = {
    username: "",
    bio: "",
    farcaster_username: "",
    instagram_username: "",
    twitter_username: "",
    telegram_username: "",
  };
  try {
    const profile = await getProfile(address as Address);
    if (profile)
      return {
        ...profile,
        storage: "supabase",
      };
    const zora = await getZoraProfile(address as Address);
    if (zora)
      return {
        ...emptyFields,
        username: zora.displayName,
        bio: zora.description,
        twitter_username: zora.socialAccounts.twitter?.username || "",
        instagram_username: zora.socialAccounts.instagram?.username || "",
        storage: "zora",
      };

    const ensName = await getEnsName(address as Address);
    if (ensName)
      return {
        ...emptyFields,
        username: ensName,
        storage: "ens",
      };
    return emptyFields;
  } catch (error) {
    console.error(error);
    return emptyFields;
  }
};

export default getArtistProfile;
