import { useRouter } from "next/navigation";
import { useMetadata } from "./useMetadata";
import { TimelineMoment } from "./useTimelineApi";
import { getShortNetworkNameFromChainId } from "@/lib/zora/zoraToViem";

export const useClickMoment = (moment: TimelineMoment) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(moment.uri);

  const handleClick = () => {
    if (data?.external_url) {
      try {
        const url = new URL(data.external_url);
        if (url.protocol === "http:" || url.protocol === "https:") {
          window.open(url.toString(), "_blank", "noopener,noreferrer");
          return;
        }
      } catch {
        // Invalid or unsupported URL; fall through to internal navigation
      }
    }
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
