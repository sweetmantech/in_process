import { Address } from "viem";
import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const getTokensAndUris = async (collection: Address, chainId: number) => {
  try {
    const publicClient = getPublicClient(chainId);

    const nextTokenId = await publicClient.readContract({
      address: collection,
      abi: zoraCreator1155ImplABI,
      functionName: "nextTokenId",
      args: [],
    });

    const uriCalls = Array.from({
      length: parseInt(nextTokenId.toString(), 10) - 1,
    }).map((_, i) => ({
      address: collection,
      abi: zoraCreator1155ImplABI,
      functionName: "uri",
      args: [i + 1],
    }));

    const returnValues = await publicClient.multicall({
      contracts: uriCalls as any,
    });

    return Array.from({ length: parseInt(nextTokenId.toString(), 10) - 1 }).map(
      (_, i) => ({
        tokenId: BigInt(i + 1),
        uri: returnValues[i].result as string,
      }),
    );
  } catch (error) {
    console.error(error);
    throw new Error("failed to get tokens");
  }
};

export default getTokensAndUris;
