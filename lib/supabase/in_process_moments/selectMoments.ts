import { Address } from "viem";
import { supabase } from "../client";

const selectMoments = async ({
  collectionAddress,
  tokenId,
  chainId,
}: {
  collectionAddress: Address;
  tokenId: string;
  chainId: number;
}) => {
  let query = supabase
    .from("in_process_moments")
    .select("*, collection:in_process_collections!inner(*)");

  if (chainId) {
    query = query.eq("collection.chain_id", chainId);
  }
  if (collectionAddress) {
    query = query.eq("collection.address", collectionAddress.toLowerCase());
  }
  if (tokenId) {
    query = query.eq("token_id", Number(tokenId));
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export default selectMoments;
