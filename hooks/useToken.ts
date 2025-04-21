import { getPublicClient } from "@/lib/viem/publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Address } from "abitype";
import { useEffect, useState } from "react";

const useToken = (
  collectionAddress: Address,
  tokenId: string,
  chainId: number,
) => {
  const [tokenUri, setTokenUri] = useState<string>("");
  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClient(chainId);
      const uri = await publicClient.readContract({
        address: collectionAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "uri",
        args: [BigInt(tokenId)],
      });

      setTokenUri(uri as string);
    };
    if (collectionAddress && chainId && tokenId) init();
  }, [collectionAddress, chainId, tokenId]);

  return {
    tokenUri,
  };
};

export default useToken;
