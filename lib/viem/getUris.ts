import { Address } from "viem";
import { getPublicClient } from "./publicClient";
import getNetworkId from "./getNetworkId";
import { isNormalizeableIPFSUrl } from "../protocolSdk/ipfs/ipfs";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

export interface NftMetadata {
  image: string;
  name: string;
  description: string;
}

export interface LatestFeed {
  nft_contract_address: Address;
  collection_contract_address: Address;
  owner: Address;
  token_id: string;
  nft_type: string;
  network: string;
  release_date: string;
  uri: string;
}

export async function getUris(feed: LatestFeed[]): Promise<LatestFeed[]> {
  try {
    const groupedFeedByNetwork = feed.reduce(
      (acc: { [network: string]: LatestFeed[] }, item: LatestFeed) => {
        const network = item.network;
        if (!acc[network]) {
          acc[network] = [];
        }
        acc[network].push(item);
        return acc;
      },
      {},
    );
    const uriPromise = Object.entries(groupedFeedByNetwork).map(
      async ([network, nfts]) => {
        const publicClient = getPublicClient(getNetworkId(network));
        const calls = nfts.map((nft: LatestFeed) => {
          return {
            address: nft.nft_contract_address,
            abi: zoraCreator1155ImplABI,
            functionName: "uri",
            args: [parseInt(nft.token_id, 10)],
          };
        });
        const returnValues = await publicClient.multicall({
          contracts: calls as any,
        });
        return nfts.map((nft: LatestFeed, i) => {
          const uri =
            typeof returnValues?.[i]?.result === "string"
              ? returnValues[i].result
              : "";
          return {
            ...nft,
            uri: isNormalizeableIPFSUrl(uri || "")
              ? uri.replaceAll("{id}", nft.token_id)
              : Boolean(new URL(uri))
                ? uri.replaceAll("{id}", nft.token_id)
                : "",
          };
        });
      },
    );
    const nftsWithUri = await Promise.all(uriPromise);
    return nftsWithUri.flat();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
