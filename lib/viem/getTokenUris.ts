import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Token } from "@/types/token";

export async function getTokenUris(feeds: Token[]): Promise<Token[]> {
  try {
    const groupedFeedByNetwork = feeds.reduce(
      (acc: { [network: string]: Token[] }, item: Token) => {
        const network = item.chainId;
        if (!acc[network]) {
          acc[network] = [];
        }
        acc[network].push(item);
        return acc;
      },
      {},
    );
    const promise = Object.entries(groupedFeedByNetwork).map(
      async ([chainId, tokens]) => {
        const publicClient = getPublicClient(parseInt(chainId, 10));
        const calls = tokens.map((t: Token) => ({
          address: t.collection,
          abi: zoraCreator1155ImplABI,
          functionName: "uri",
          args: [t.tokenId],
        }));
        const multicalls = calls.flat();
        const result = await publicClient.multicall({
          contracts: multicalls as any,
        });
        return tokens.map((t: Token, i: number) => ({
          ...t,
          uri: result[i].result as string,
        }));
      },
    );
    const tokens = await Promise.all(promise);
    return tokens.flat();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
