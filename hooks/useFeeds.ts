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
const useFeeds = () => {
  const offset = 10;
  const [feeds, setFeeds] = useState<Token[]>([]);
  const [hasMoreT, setHasMoreT] = useState<boolean>(true);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsIndex, setCollectionsIndex] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      const response = await fetch("/api/dune/collections");
      const data = await response.json();
      setCollections(data);
    };
    init();
  }, []);

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
    setFeeds([...feeds, ...tokens]);
    setCollectionsIndex(collectionsIndex + offset);
  }, [collections, collectionsIndex]);

  useEffect(() => {
    const init = async () => {
      setFeeds([]);
      await fetchMore();
    };
    init();
  }, [collections]);

  return {
    hasMoreT,
    fetchMore,
    feeds,
    collectionsIndex,
  };
};

export default useFeeds;
