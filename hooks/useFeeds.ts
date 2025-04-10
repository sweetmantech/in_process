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
      setCollections(data);
    };
    init();
  }, []);

  const fetchMore = useCallback(
    async (start: number) => {
      if (!collections.length) return;
      const collectionAddresses = collections.slice(start, offset);
    },
    [collections],
  );

  return {
    hasMoreT,
    fetchMore,
  };
};

export default useFeeds;
