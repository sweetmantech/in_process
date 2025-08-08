import { Address } from "viem";
import getEnsName from "./viem/getEnsName";
import getZoraProfile from "./zora/getZoraProfile";

const getArtistProfile = async (walletAddress: Address) => {
  try {
    let profile = {
      username: "",
      bio: "",
      socials: {
        instagram: "",
        twitter: "",
        telegram: "",
      },
    };

    // Try Zora profile first
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
      // Fallback to ENS name
      const ensName = await getEnsName(walletAddress as Address);
      if (ensName) {
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
      socials: {
        instagram: "",
        twitter: "",
        telegram: "",
      },
    };
  }
};

export default getArtistProfile;
