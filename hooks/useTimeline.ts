import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";

export interface Moment {
  owner: Address;
  tokenContract: Address;
  tokenId: string;
}

const useTimeline = () => {
  const [hiddenMoments, setHiddenMoments] = useState<Moment[]>([]);
  const getTimeline = useCallback(async () => {
    const response = await fetch(`/api/token/timeline`);
    const data = await response.json();
    setHiddenMoments(
      JSON.parse(data.tagData.hidden).map((item: any) => ({
        ...item,
        tokenId: String(item.tokenId),
      }))
    );
  }, []);

  useEffect(() => {
    getTimeline();
  }, [getTimeline]);

  return {
    getTimeline,
    hiddenMoments,
  };
};

export default useTimeline;
