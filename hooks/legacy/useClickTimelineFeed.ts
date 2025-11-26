import { usePathname, useRouter } from "next/navigation";
import { useMetadata } from "../useMetadata";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { TimelineMoment } from "@/lib/timeline/fetchTimeline";

export const useClickTimelineFeed = (feed: TimelineMoment) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/timeline";

  const { isLoading, data } = useMetadata(feed.uri);

  const handleClick = () => {
    if (isHomePage) {
      push(`/${feed.admin}`);
      return;
    }
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    const shortNetworkName = getShortNetworkName(feed.chain_id === 8453 ? "base" : "base sepolia");
    const tokenId = feed.tokenId == "0" ? 1 : feed.tokenId;
    push(`/collect/${shortNetworkName}:${feed.address}/${tokenId}`);
    return;
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(feed.createdAt).toLocaleString().toLowerCase(),
  };
};
