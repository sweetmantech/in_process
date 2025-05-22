import { Address } from "viem";
// import getTag from "./stack/getTag";
import getEnsName from "./viem/getEnsName";
import getZoraProfile from "./zora/getZoraProfile";

const getArtistProfile = async (walletAddress: Address) => {
  try {
    // const tags: any = await getTag(walletAddress as Address, "profile");
    let profile = {
      username: "",
      bio: "",
    };

    // if (tags?.tagData) {
    //   profile = {
    //     ...profile,
    //     ...tags?.tagData,
    //   };
    // } else {
    const zora = await getZoraProfile(walletAddress as Address);
    if (zora) {
      profile = {
        ...profile,
        username: zora.displayName,
        bio: zora.description,
      };
    } else {
      const ensName = await getEnsName(walletAddress as Address);
      if (ensName)
        profile = {
          ...profile,
          username: ensName,
        };
    }
    // }
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
