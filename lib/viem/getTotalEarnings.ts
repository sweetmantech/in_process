import getNextTokenIds from "@/lib/viem/getNextTokenIds";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@/lib/protocolSdk/constants";
import { CHAIN_ID } from "@/lib/consts";
import {
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { getPublicClient } from "@/lib/viem/publicClient";
import { Collection } from "@/types/token";
import { Address, formatEther } from "viem";

const fetchTokenData = async (contract: Address) => {
  const response = await fetch(`/api/dune/purchased?tokenContract=${contract}`);
  return response.ok ? response.json() : [];
};

// Removed USDC transfer fetching; USDC earnings now sourced from Supabase payments

const getTotalEarnings = async (
  collections: Collection[],
  artistAddress: Address
) => {
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
    .reduce((acc, e) => acc + BigInt(e.value), BigInt(0));

  // Fetch USDC earnings from payments API for the artist
  const paymentsResponse = await fetch(
    `/api/payments?artist=${(artistAddress as string).toLowerCase()}`
  );
  const paymentsData = paymentsResponse.ok
    ? await paymentsResponse.json()
    : { payments: [] };
  const usdcTotal = Array.isArray(paymentsData.payments)
    ? paymentsData.payments.reduce(
        (sum: number, p: any) => sum + Number(p.amount || 0),
        0
      )
    : 0;

  return {
    eth: formatEther(ethSum),
    usdc: usdcTotal.toFixed(2),
  };
};

export default getTotalEarnings;
