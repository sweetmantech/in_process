import { Address } from "viem";
import { supabase } from "@/lib/supabase/client";

interface UpdateTokenContractURIParams {
  tokenContractAddress: Address;
  tokenId: number;
  chainId: number;
  uri: string;
}

export async function updateTokenContractURI({
  tokenContractAddress,
  tokenId,
  chainId,
  uri,
}: UpdateTokenContractURIParams) {
  const { data, error } = await supabase
    .from("in_process_tokens")
    .update({ uri })
    .eq("address", tokenContractAddress)
    .eq("tokenId", tokenId)
    .eq("chainId", chainId)
    .select();
  return { data, error };
}
