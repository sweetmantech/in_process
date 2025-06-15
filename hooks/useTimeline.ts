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

  const toggleMoment = async (moment: Moment) => {
    await fetch("/api/token/hide", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ moment }),
    });
  };

  useEffect(() => {
    getTimeline();
  }, [getTimeline]);

  return {
    getTimeline,
    hiddenMoments,
    toggleMoment,
  };
};

export default useTimeline;
