import { Collection, Token } from "@/types/token";
import { useCallback, useEffect, useState } from "react";

const useFeeds = () => {
  const offset = 10;
  const [feeds, setFeeds] = useState<Token[]>([]);
  const [hasMoreT, setHasMoreT] = useState<boolean>(true);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const init = async () => {
      const response = await fetch("/api/dune/collections");
      const data = await response.json();
      console.log("ziad", data);
      setCollections(data);
    };
    init();
  }, []);

  const fetchMore = useCallback(
    async (start: number) => {
      if (!collections.length) return;
      const collectionAddresses = collections.slice(start, offset);
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
      setFeeds(data);
    },
    [collections],
  );

  useEffect(() => {
    const init = async () => {
      setFeeds([]);
      await fetchMore(0);
    };
    init();
  }, [fetchMore]);

  return {
    hasMoreT,
    fetchMore,
    feeds,
  };
};

export default useFeeds;
