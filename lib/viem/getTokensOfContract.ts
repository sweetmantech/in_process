import { Address } from "viem";
import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

export async function getTokensOfContract(chainId: number, address: Address) {
  try {
    const publicClient = getPublicClient(chainId);

    const nextTokenId = await publicClient.readContract({
      address,
      abi: zoraCreator1155ImplABI,
      functionName: "nextTokenId",
    });

    const tokenPromises = [];
    for (let i = BigInt(1); i < nextTokenId; i++) {
      const promise = publicClient
        .readContract({
          address,
          abi: zoraCreator1155ImplABI,
          functionName: "uri",
          args: [i],
        })
        .then(async (uri) => ({
          token: {
            tokenId: i.toString(),
            tokenURI: uri,
            contract: {
              address,
            },
          },
        }));
      tokenPromises.push(promise);
    }

    const tokenResults = await Promise.all(tokenPromises);
    return tokenResults.reverse();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
