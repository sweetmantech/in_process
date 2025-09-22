import { Address } from "viem";
import { Collection } from "@/types/token";
import getNextTokenIds from "@/lib/viem/getNextTokenIds";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN_ID } from "@/lib/consts";
import {
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { getPublicClient } from "@/lib/viem/publicClient";
import { formatEther } from "viem";

interface DuneEvent {
  value: string;
}

const fetchTokenData = async (contract: Address): Promise<DuneEvent[]> => {
  const response = await fetch(`/api/dune/purchased?tokenContract=${contract}`);
  return response.ok ? response.json() : [];
};

const getEthArtistPayments = async (
  collections: Collection[]
): Promise<string> => {
  const nextTokenIds = await getNextTokenIds(collections);
  const publicClient = getPublicClient(CHAIN_ID);

  const calls = nextTokenIds.flatMap((c) =>
    Array.from({ length: c.nextTokenId - 1 }, (_, i) => [
      {
        address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
        abi: zoraCreatorFixedPriceSaleStrategyABI,
        functionName: "sale",
        args: [c.newContract, i + 1],
      },
      {
        address: c.newContract,
        abi: zoraCreator1155ImplABI,
        functionName: "getTokenInfo",
        args: [i + 1],
      },
    ]).flat()
  );

  const returnValues: any = await publicClient.multicall({
    contracts: calls as any,
  });

  const ethPriceCollections = new Set<Address>();
  for (let i = 0; i < returnValues.length; i += 2) {
    const totalMinted = returnValues[i + 1].result?.totalMinted;
    const ethTokenPrice = returnValues[i].result?.pricePerToken as bigint;

    if (totalMinted > BigInt(0)) {
      const collectionAddress = calls[i].args[0] as Address;
      if (ethTokenPrice > BigInt(0)) ethPriceCollections.add(collectionAddress);
    }
  }

  const ethEvents = await Promise.all(
    [...ethPriceCollections].map(fetchTokenData)
  );
  const ethSum = ethEvents
    .flat()
    .reduce((acc: bigint, e: DuneEvent) => acc + BigInt(e.value), BigInt(0));

  return formatEther(ethSum);
};

export default getEthArtistPayments;
