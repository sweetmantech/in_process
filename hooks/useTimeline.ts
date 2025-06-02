import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";

export interface Moment {
  owner: Address;
  tokenContract: Address;
  tokenId: string;
}
const hideMoments = async (tokens: Moment[]) => {
  await fetch("/api/token/hide", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ tokens }),
  });
};
const useTimeline = () => {
  const [hiddenMoments, setHiddenMoments] = useState<Moment[]>([]);
  console.log("useTimeline hiddenMoments", hiddenMoments);
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

  const toggleMoment = (moment: Moment) => {
    console.log("useTimeline toggleMoment", moment);
    const find = hiddenMoments.find(
      (ele) =>
        ele.tokenContract === moment.tokenContract.toLowerCase() &&
        ele.tokenId === moment.tokenId
    );

    if (find) {
      const filtered = [...hiddenMoments].filter((ele) =>
        Boolean(
          ele.tokenContract !== moment.tokenContract.toLowerCase() ||
            ele.tokenId !== moment.tokenId
        )
      );
      setHiddenMoments([...filtered]);
      hideMoments([...filtered]);
      return;
    }

    const newHiddenMoments = [
      ...hiddenMoments,
      {
        owner: moment.owner.toLowerCase() as Address,
        tokenContract: moment.tokenContract.toLowerCase() as Address,
        tokenId: moment.tokenId,
      },
    ];
    setHiddenMoments(newHiddenMoments);
    hideMoments(newHiddenMoments);
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
