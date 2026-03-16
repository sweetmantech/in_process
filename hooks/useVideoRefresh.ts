import { getMomentApi } from "@/lib/moment/getMomentApi";
import { TimelineMoment } from "@/types/moment";
import { Address } from "viem";

const useVideoRefresh = (moment: TimelineMoment) => {
  const handleRefresh = async (): Promise<string | undefined> => {
    try {
      const fresh = await getMomentApi({
        collectionAddress: moment.address as Address,
        tokenId: moment.token_id,
        chainId: moment.chain_id,
      });
      return fresh?.metadata?.animation_url;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return { handleRefresh };
};

export default useVideoRefresh;
