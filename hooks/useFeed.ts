import { useRouter } from "next/navigation";
import { useMetadata } from "./useMetadata";
import { Collection } from "@/types/token";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

export const useFeed = (feed: Collection, shouldCollect: boolean) => {
  const { push } = useRouter();
  const { isLoading, data } = useMetadata(feed.contractURI);

  const handleClick = () => {
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    if (shouldCollect) {
      const shortNetworkName = getShortNetworkName(
        feed.chain.replaceAll("_", " "),
      );
      push(`/collect/${shortNetworkName}:${feed.newContract}/1`);
      return;
    }
    push(`/${feed.creator}`);
  };

  return {
    isLoading,
    data,
    handleClick,
    formattedDate: new Date(feed.released_at).toLocaleString(),
  };
};
