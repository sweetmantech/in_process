import { Address } from "viem";
import { getProfile } from "./supabase/in_process_artists/getProfile";
import resolveAddressToEns from "./ens/resolveAddressToEns";

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
    const ensName = await resolveAddressToEns(address as Address);

    const profile = await getProfile(address as Address);
    if (profile)
      return {
        ...profile,
        username: profile.username || ensName,
      };

    return {
      ...emptyFields,
      username: ensName,
    };
  } catch (error) {
    console.error(error);
    return emptyFields;
  }
};

export default getArtistProfile;
