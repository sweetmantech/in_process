import { Collection, Token } from "@/types/token";
import { useCallback, useEffect, useState } from "react";

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
    console.log("ziad call 1", collectionsIndex, collections.length);
    if (!collections.length) return;
    const collectionAddresses = collections.slice(
      collectionsIndex,
      collectionsIndex + offset,
    );
    console.log("ziad call 2", collectionsIndex, collectionAddresses);
    if (!collectionAddresses.length) {
      setHasMoreT(false);
      return;
    }
    const response = await fetch("/api/dune/tokens", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collections: collectionAddresses,
      }),
    });
    const data = await response.json();
    console.log("ziad", data);
    setFeeds([...feeds, ...data]);
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
