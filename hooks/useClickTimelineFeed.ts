import { usePathname, useRouter } from "next/navigation";
import { useMetadata } from "./useMetadata";
import { Token } from "@/types/token";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

export const useClickTimelineFeed = (feed: Token) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { isLoading, data } = useMetadata(feed.uri);

  const handleClick = () => {
    if (isHomePage) {
      push(`/${feed.creator}`);
      return;
    }
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    const shortNetworkName = getShortNetworkName(
      feed.chain.replaceAll("_", " "),
    );
    push(`/collect/${shortNetworkName}:${feed.collection}/${feed.tokenId}`);
    return;
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(feed.released_at).toLocaleString().toLowerCase(),
  };
};
