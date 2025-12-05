import { useQuery } from "@tanstack/react-query";
import getCollection from "@/lib/supabase/in_process_collections/getCollection";
import { Address } from "viem";

const useCollectionProfile = (address: Address | undefined, chainId: number | undefined) => {
  return useQuery({
    queryKey: ["collection-profile", address, chainId],
    queryFn: () => {
      if (!address || !chainId) throw new Error("Address and chainId are required");
      return {
        name: "aaa",
      };
    },
    enabled: Boolean(address && chainId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useCollectionProfile;
