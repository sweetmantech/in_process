import { Address } from "viem";
import { VERCEL_OG } from "./og/consts";

export interface Profile {
  username: string | null;
  bio: string | null;
}
const fetchArtistProfile = async (artistAddress: Address): Promise<Profile> => {
  const response = await fetch(
    `${VERCEL_OG}/api/profile?walletAddress=${artistAddress}`,
  );
  const data = await response.json();
  return data;
};

export default fetchArtistProfile;
