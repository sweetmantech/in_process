import { useRouter } from "next/navigation";
import { useMetadata } from "./useMetadata";
import { TimelineMoment } from "./useTimelineApi";
import { getShortNetworkNameFromChainId } from "@/lib/zora/zoraToViem";

export const useClickMoment = (moment: TimelineMoment) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(moment.uri);

  const handleClick = () => {
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    
    const shortNetworkName = getShortNetworkNameFromChainId(moment.chainId);
    if (shortNetworkName) {
      const tokenId = moment.tokenId === "0" ? "1" : moment.tokenId;
      push(`/collect/${shortNetworkName}:${moment.address}/${tokenId}`);
    }
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(moment.createdAt).toLocaleString(),
  };
};
