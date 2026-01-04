import { useQuery } from "@tanstack/react-query";
import getTokenInfo from "@/lib/zora/getTokenInfo";
import { Moment } from "@/types/moment";

const useIsSoldOut = (moment: Moment) => {
  return useQuery({
    queryKey: ["tokenInfo", moment.collectionAddress, moment.tokenId],
    queryFn: async () => {
      const info = await getTokenInfo(moment.collectionAddress, moment.tokenId, moment.chainId);
      if (!info) return false;
      return BigInt(info.maxSupply) === BigInt(info.totalMinted);
    },
    enabled: Boolean(moment.collectionAddress && moment.tokenId),
    staleTime: 0,
    refetchOnMount: true,
  });
};

export default useIsSoldOut;
