import { useState, useEffect } from "react";
import { CollectionStyle } from "@/types/zora";
import { getCollectionStyle } from "@/lib/zora/getCollectionStyle";
import { Address } from "viem";

const useCollectionStyling = (chainId: number, address: Address) => {
  const [styling, setStyling] = useState<CollectionStyle>();

  useEffect(() => {
    async function fetchStyling() {
      try {
        const collectionStyle = await getCollectionStyle(chainId, address);
        if (!collectionStyle) throw new Error("No styling found");
        setStyling(collectionStyle);
      } catch (error) {
        console.error("Error fetching styling:", error);
      }
    }

    fetchStyling();
  }, [address, chainId]);

  return { styling };
};

export default useCollectionStyling;
