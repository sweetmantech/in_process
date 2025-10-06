import { Address } from "viem";
import getEnsName from "./viem/getEnsName";
import getZoraProfile from "./zora/getZoraProfile";
import { getProfile } from "./supabase/in_process_artists/getProfile";

const getArtistProfile = async (walletAddress: Address) => {
  try {
    const tags: any = await getProfile(walletAddress as Address);
    let profile = {
      username: "",
      bio: "",
      socials: {
        instagram: "",
        twitter: "",
        telegram: "",
      },
    };

    if (tags?.tagData) {
      profile = {
        ...profile,
        ...tags?.tagData,
      };
    } else {
      const zora = await getZoraProfile(walletAddress as Address);
      if (zora) {
        profile = {
          ...profile,
          username: zora.displayName,
          bio: zora.description,
          socials: {
            ...profile.socials,
            twitter: zora.socialAccounts.twitter?.username || "",
            instagram: zora.socialAccounts.instagram?.username || "",
          },
        };
      } else {
        const ensName = await getEnsName(walletAddress as Address);
        if (ensName)
          profile = {
            ...profile,
            username: ensName,
          };
      }
    }
    return profile;
  } catch (error) {
    console.error(error);
    return {
      username: "",
      bio: "",
    };
  }
};

export default getArtistProfile;
