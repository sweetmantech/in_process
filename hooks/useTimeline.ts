import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";

export interface Moment {
  owner: Address;
  tokenContract: Address;
  tokenId: number;
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

  const getTimeline = useCallback(async () => {
    const response = await fetch(`/api/token/timeline`);
    const data = await response.json();
    setHiddenMoments(JSON.parse(data.tagData.hidden));
  }, []);

  const toggleMoment = (moment: Moment) => {
    const find = hiddenMoments.find(
      (ele) =>
        ele.tokenContract === moment.tokenContract.toLowerCase() &&
        ele.tokenId === moment.tokenId
    );
    console.log("useTimeline find", find);

    if (find) {
      const filtered = [...hiddenMoments].filter((ele) =>
        Boolean(
          ele.tokenContract !== moment.tokenContract.toLowerCase() ||
            ele.tokenId !== moment.tokenId
        )
      );
      console.log("useTimeline filtered", filtered);
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
    console.log("useTimeline newHiddenMoments", newHiddenMoments);

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
