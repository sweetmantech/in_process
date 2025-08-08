import { Address } from "viem";
import getEnsName from "./viem/getEnsName";
import getZoraProfile from "./zora/getZoraProfile";
import { getArtistWithAddress } from "./supabase/in_process_artists/getArtistWithAddress";

const getArtistProfile = async (walletAddress: Address) => {
  try {
    const { data, error } = await getArtistWithAddress(walletAddress as Address);
    let profile = {
      username: "",
      bio: "",
      socials: {
        instagram: "",
        twitter: "",
        telegram: "",
      },
    };

    if(data){
      profile = {
        ...profile,
        username: data.username || "",
        bio: data.bio || "",
        socials: {
          ...profile.socials,
          twitter: data.twitter_username || "",
          instagram: data.instagram_username || "",
          telegram: data.telegram_username || "",
        },
      };
    }else{
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
