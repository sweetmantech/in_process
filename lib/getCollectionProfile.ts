import { Address } from "viem";
import getCollection from "./supabase/in_process_collections/getCollection";

const getCollectionProfile = async (address: Address, chainId: number) => {
  const { data, error } = await getCollection(address, chainId);
  if (error || !data) {
    return {
      name: "",
    };
  }
  return {
    name: data.name || "",
  };
};

export default getCollectionProfile;
