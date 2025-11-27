import { supabase } from "../client";
import { Moment } from "@/types/moment";

const selectMoment = async (moment: Moment) => {
  const { collectionAddress, tokenId, chainId } = moment;
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

  const { data, error } = await query.single();
  if (error) return null;
  return data;
};

export default selectMoment;
