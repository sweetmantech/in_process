import { supabase } from "../client";
import { Address } from "viem";

const getCollection = async (address: Address, chainId: number) => {
  const { data, error } = await supabase
    .from("in_process_collections")
    .select("*")
    .eq("address", address.toLowerCase())
    .eq("chain_id", chainId)
    .single();

  if (error) return { data: null, error };
  return { data, error: null };
};

export default getCollection;
