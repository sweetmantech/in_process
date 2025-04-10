import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Collection } from "@/types/token";

export async function getUris(feeds: Collection[]): Promise<Collection[]> {
  try {
    const groupedFeedByNetwork = feeds.reduce(
      (acc: { [network: string]: Collection[] }, item: Collection) => {
        const network = item.chainId;
        if (!acc[network]) {
          acc[network] = [];
        }
        acc[network].push(item);
        return acc;
      },
      {},
    );
    const uriPromise = Object.entries(groupedFeedByNetwork).map(
      async ([chainId, collections]) => {
        const publicClient = getPublicClient(parseInt(chainId, 10));
        const calls = collections.map((c: Collection) => ({
          address: c.newContract,
          abi: zoraCreator1155ImplABI,
          functionName: "contractURI",
        }));
        const returnValues = await publicClient.multicall({
          contracts: calls as any,
        });
        return collections.map((c: Collection, i) => ({
          ...c,
          contractURI: returnValues[i].result as string,
        }));
      },
    );
    const nftsWithUri = await Promise.all(uriPromise);
    return nftsWithUri.flat();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
