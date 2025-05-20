import { Address } from "viem";

export interface Profile {
  username: string | null;
  bio: string | null;
}
const fetchArtistProfile = async (artistAddress: Address): Promise<Profile> => {
  const response = await fetch(`/api/profile?walletAddress=${artistAddress}`);
  const data = await response.json();
  return data;
};

export default fetchArtistProfile;
