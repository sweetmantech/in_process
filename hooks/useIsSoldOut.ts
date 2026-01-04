import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getTokenInfo from "@/lib/zora/getTokenInfo";
import { Moment } from "@/types/moment";

const useIsSoldOut = (moment: Moment): UseQueryResult<boolean, Error> => {
  return useQuery<boolean, Error>({
    queryKey: ["is-sold-out", moment.collectionAddress, moment.tokenId, moment.chainId],
    queryFn: async () => {
      const info = await getTokenInfo(moment.collectionAddress, moment.tokenId, moment.chainId);
      if (!info) throw new Error("Failed to get token info");
      return info.maxSupply === info.totalMinted;
    },
    enabled: Boolean(moment.collectionAddress && moment.tokenId && moment.chainId),
    staleTime: 0,
    refetchOnMount: true,
  });
};

export default useIsSoldOut;
