import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Collection, Token } from "@/types/token";

type CollectionExtended = Collection & {
  nextTokenId: number;
};

type ExtendedCollectionWithTokenId = Collection & {
  tokenId: number;
};

export async function getTokens(feeds: CollectionExtended[]): Promise<Token[]> {
  try {
    const groupedFeedByNetwork = feeds.reduce(
      (
        acc: { [network: string]: CollectionExtended[] },
        item: CollectionExtended,
      ) => {
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
      async ([chainId, collections]) => {
        const publicClient = getPublicClient(parseInt(chainId, 10));
        const returnValues: ExtendedCollectionWithTokenId[] = [];
        const calls = collections.map((c: CollectionExtended) => {
          const subCalls = [];
          for (let i = c.nextTokenId - 1; i >= 1; i--) {
            returnValues.push({
              ...c,
              tokenId: i,
            });
            subCalls.push({
              address: c.newContract,
              abi: zoraCreator1155ImplABI,
              functionName: "uri",
              args: [i],
            });
          }
          return subCalls;
        });
        const multicalls = calls.flat();
        const result = await publicClient.multicall({
          contracts: multicalls as any,
        });
        return returnValues.map((c: ExtendedCollectionWithTokenId, i) => ({
          collectionAddress: c.newContract,
          creator: c.defaultAdmin,
          released_at: c.released_at,
          chainId: c.chainId,
          chain: c.chain,
          tokenId: c.tokenId,
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
