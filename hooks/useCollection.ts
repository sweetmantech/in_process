import { getPublicClient } from "@/lib/viem/publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useEffect, useState } from "react";
import { Address } from "viem";

const useCollection = (collection: Address, chainId: number) => {
  const [collectionURI, setCollectionURI] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(chainId);
      const uri = await publicClient.readContract({
        address: collection,
        abi: zoraCreator1155ImplABI,
        functionName: "contractURI",
      });

      setCollectionURI(uri as string);
    };
    if (collection && chainId) init();
  }, [collection, chainId]);

  return {
    collectionURI,
  };
};

export default useCollection;
