import delay from "@/lib/delay";
import { Collection, Token } from "@/types/token";
import { useCallback, useEffect, useState } from "react";

const fetchTokens = async (collectionAddresses: Collection[]) => {
  while (1) {
    const response = await fetch("/api/dune/tokens", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collections: collectionAddresses,
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
  const offset = 10;
  const [feeds, setFeeds] = useState<Token[]>([]);
  const [hasMoreT, setHasMoreT] = useState<boolean>(true);
  const [collectionsIndex, setCollectionsIndex] = useState<number>(0);

  const fetchMore = useCallback(async () => {
    if (!collections.length) return;
    const collectionAddresses = collections.slice(
      collectionsIndex,
      collectionsIndex + offset,
    );
    if (!collectionAddresses.length) {
      setHasMoreT(false);
      return;
    }
    const tokens = await fetchTokens(collectionAddresses);
    setFeeds(
      [...feeds, ...tokens].sort(
        (a, b) =>
          new Date(b.released_at).getTime() - new Date(a.released_at).getTime(),
      ),
    );
    setCollectionsIndex(collectionsIndex + offset);
  }, [collections, collectionsIndex]);

  useEffect(() => {
    const init = async () => {
      setFeeds([]);
      await fetchMore();
    };
    if (collections.length) init();
  }, [collections]);

  return {
    hasMoreT,
    fetchMore,
    feeds,
    collectionsIndex,
    collections,
  };
};

export default useFeeds;
