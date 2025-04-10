import { getPublicClient } from "./publicClient";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { Collection } from "@/types/token";

export type CollectionAndNextTokenId = Collection & {
  nextTokenId: number;
};

const getNextTokenIds = async (collections: Collection[]) => {
  const groupedFeedByNetwork = collections.reduce(
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

  const promise = Object.entries(groupedFeedByNetwork).map(
    async ([chainId, collections]) => {
      const publicClient = getPublicClient(parseInt(chainId, 10));
      const calls = collections.map((c: Collection) => ({
        address: c.newContract,
        abi: zoraCreator1155ImplABI,
        functionName: "nextTokenId",
      }));
      const returnValues = await publicClient.multicall({
        contracts: calls as any,
      });
      return collections.map((c: Collection, i) => ({
        ...c,
        nextTokenId: Number(returnValues[i].result as bigint),
      }));
    },
  );
  const result = await Promise.all(promise);
  return result.flat() as CollectionAndNextTokenId[];
};

export default getNextTokenIds;
