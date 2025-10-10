import { Address } from "viem";
import { Database } from "./supabase/types";

const fetchExternalWallets = async (
  artistAddress: Address
): Promise<Database["public"]["Tables"]["in_process_artists"]["Row"]> => {
  const response = await fetch(`/api/profile?address=${artistAddress}`);
  const data = await response.json();
  return data;
};

export default fetchExternalWallets;
