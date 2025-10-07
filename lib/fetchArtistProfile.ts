import { Address } from "viem";
import { Database } from "./supabase/types";

export interface Profile {
  username: string | null;
  bio: string | null;
  socials: {
    twitter: string;
    telegram: string;
    instagram: string;
  };
}
const fetchArtistProfile = async (
  artistAddress: Address
): Promise<Database["public"]["Tables"]["in_process_artists"]["Row"]> => {
  const response = await fetch(`/api/profile?address=${artistAddress}`);
  const data = await response.json();
  return data;
};

export default fetchArtistProfile;
