import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getTokenInfo = async (collection: Address, tokenId: string, chainId: number) => {
  try {
    const publicClient = getPublicClient(chainId);
    const info = await publicClient.readContract({
      address: collection,
      abi: zoraCreator1155ImplABI,
      functionName: "getTokenInfo",
      args: [BigInt(tokenId)],
    });

    return info;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getTokenInfo;
