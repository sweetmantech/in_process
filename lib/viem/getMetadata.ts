import { getPublicClient } from "./publicClient";
import getNetworkId from "./getNetworkId";
import { getIpfsLink } from "../utils";
import { LatestFeed, NftMetadata } from "../dune/getLatestFeed";

const aggregatedAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "uri",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

export async function getMetadata(feed: LatestFeed[]): Promise<NftMetadata[]> {
  try {
    const promise = feed.map(async (item: LatestFeed) => {
      try {
        const publicClient = getPublicClient(getNetworkId(item.network));

        const uri = await publicClient.readContract({
          address: item.nft_contract_address,
          abi: aggregatedAbi,
          functionName: item.nft_type === "erc721" ? "tokenURI" : "uri",
          args: [parseInt(item.token_id, 10)],
        });
        if (!uri)
          return {
            image: "",
            name: "",
            description: "",
            tokenId: parseInt(item.token_id, 10),
            chainId: getNetworkId(item.network),
            type: item.nft_type,
            address: item.nft_contract_address,
          };
        const response = await fetch(getIpfsLink(uri as string));
        const data = await response.json();
        return {
          image: getIpfsLink(data?.image || ""),
          description: data?.description || "",
          name: data?.name || "",
          chainId: getNetworkId(item.network),
          type: item.nft_type,
          address: item.nft_contract_address,
          tokenId: parseInt(item.token_id, 10),
        };
      } catch (error) {
        console.error(error);
        return {
          image: "",
          name: "",
          description: "",
          tokenId: parseInt(item.token_id, 10),
          chainId: getNetworkId(item.network),
          type: item.nft_type,
          address: item.nft_contract_address,
        };
      }
    });

    const metadata = await Promise.all(promise);
    return metadata;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
