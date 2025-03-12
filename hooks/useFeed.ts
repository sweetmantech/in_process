import { usePathname, useRouter } from "next/navigation";
import { useMetadata } from "./useMetadata";
import { Collection } from "@/types/token";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

export const useFeed = (feed: Collection) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { isLoading, data } = useMetadata(feed.contractURI);

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
    push(`/collect/${shortNetworkName}:${feed.newContract}/1`);
    return;
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(feed.released_at).toLocaleString().toLowerCase(),
  };
};
