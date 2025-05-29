import delay from "@/lib/delay";
import { Collection, Token } from "@/types/token";
import { useCallback, useEffect, useState } from "react";

const fetchTokens = async (collections: Collection[]) => {
  while (true) {
    const response = await fetch("/api/dune/tokens", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collections,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    await delay(1000);
  }
};
const useFeeds = (collections: Collection[]) => {
  const chunkSizeToGetTokens = 10;
  const [feeds, setFeeds] = useState<Token[]>([]);
  const [hasMoreT, setHasMoreT] = useState<boolean>(true);
  const [tokensFetchedCollections, setTokensFetchedCollections] = useState<
    Collection[]
  >([]);
  const [isFetchingTokens, setIsFetchingTokens] = useState<boolean>(false);

  const fetchMore = useCallback(async () => {
    if (!collections.length || isFetchingTokens) return;
    setIsFetchingTokens(true);
    const collectionsToGetTokens = collections
      .filter(
        (ele: Collection) =>
          !tokensFetchedCollections.some(
            (c: Collection) => c.newContract === ele.newContract,
          ),
      )
      .slice(0, chunkSizeToGetTokens);

    if (!collectionsToGetTokens.length) {
      setHasMoreT(false);
      setIsFetchingTokens(false);
      return;
    }
    setHasMoreT(true);
    const tokens = await fetchTokens(collectionsToGetTokens);
    setFeeds([...feeds, ...tokens]);
    setTokensFetchedCollections([
      ...tokensFetchedCollections,
      ...collectionsToGetTokens,
    ]);
    setIsFetchingTokens(false);
  }, [collections, isFetchingTokens]);

  useEffect(() => {
    if (collections.length) fetchMore();
  }, [collections]);

  return {
    hasMoreT,
    fetchMore,
    feeds,
    isFetchingTokens,
  };
};

export default useFeeds;
