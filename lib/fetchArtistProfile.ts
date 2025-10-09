import { Address } from "viem";
import { Database } from "./supabase/types";

const fetchArtistProfile = async (
  artistAddress: Address
): Promise<
  Database["public"]["Tables"]["in_process_artists"]["Row"] & {
    storage?: string;
  }
> => {
  const response = await fetch(`/api/profile?address=${artistAddress}`);
  const data = await response.json();
  return data;
};

export default fetchArtistProfile;
