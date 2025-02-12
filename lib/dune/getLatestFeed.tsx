import { Address } from "viem";
import client from "./client";
import { unstable_cache } from 'next/cache';
import { getMetadata } from "../viem/getMetadata";

export interface NftMetadata {
    image: string;
    name: string;
    description: string;
    tokenId: number;
    type: string;
    chainId: number;
    address: Address;
  }

export interface LatestFeed {
    nft_contract_address: Address;
    collection_contract_address: Address;
    token_id: string;
    nft_type: string;
    network: string;
    release_data: string;
  }

export const getLatestFeed = unstable_cache(
  async () => {
    try {
      const queryResult = await client.runQuery({
        queryId: 4707812,
      });
      const metadata = await getMetadata(queryResult.result?.rows as any || []);
      return metadata.filter((ele: NftMetadata) => ele.name);
    } catch (error) {
      console.error('Error fetching Dune data:', error);
      return [];
    }
  },
  ['latest-feed'],
  {
    revalidate: 300,
    tags: ['latest-feed'],
  }
);