import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useMomentProvider } from "@/providers/MomentProvider";
import { toast } from "sonner";

const useShareMoment = () => {
  const { token } = useMomentProvider();

  const share = async () => {
    const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
    await navigator.clipboard.writeText(
      `${SITE_ORIGINAL_URL}/collect/${shortNetworkName}:${token.tokenContractAddress}/${token.tokenId}`
    );
    toast.success("copied!");
  };
  return {
    share,
  };
};

export default useShareMoment;
