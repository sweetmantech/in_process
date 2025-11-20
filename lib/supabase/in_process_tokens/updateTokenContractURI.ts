import { Address } from "viem";
import { supabase } from "@/lib/supabase/client";

interface UpdateTokenContractURIParams {
  tokenContractAddress: Address;
  tokenId: number;
  chainId: number;
  uri: string;
  createdAt?: string;
}

export async function updateTokenContractURI({
  tokenContractAddress,
  tokenId,
  chainId,
  uri,
  createdAt,
}: UpdateTokenContractURIParams) {
  const { data, error } = await supabase
    .from("in_process_tokens")
    .upsert(
      {
        address: tokenContractAddress,
        tokenId,
        chainId,
        uri,
        createdAt: createdAt || new Date().toISOString(),
      },
      { onConflict: "address,chainId" }
    )
    .select();
  return { data, error };
}
