import getNextTokenIds from "@/lib/viem/getNextTokenIds";
import {
  erc20MinterAddresses,
  zoraCreatorFixedPriceSaleStrategyAddress,
} from "@/lib/protocolSdk/constants";
import { CHAIN_ID } from "@/lib/consts";
import {
  erc20MinterABI,
  zoraCreator1155ImplABI,
  zoraCreatorFixedPriceSaleStrategyABI,
} from "@zoralabs/protocol-deployments";
import { getPublicClient } from "@/lib/viem/publicClient";
import { Collection } from "@/types/token";
import { Address, formatEther } from "viem";

const getTotalEarnings = async (collections: Collection[]) => {
  const nextTokenIds = await getNextTokenIds(collections);
  const publicClient = getPublicClient(CHAIN_ID);
  const calls = nextTokenIds
    .map((c) => {
      return Array.from({ length: c.nextTokenId - 1 })
        .map((_, i) => {
          return [
            {
              address: zoraCreatorFixedPriceSaleStrategyAddress[CHAIN_ID],
              abi: zoraCreatorFixedPriceSaleStrategyABI,
              functionName: "sale",
              args: [c.newContract, i + 1],
            },
            {
              address: erc20MinterAddresses[CHAIN_ID],
              abi: erc20MinterABI,
              functionName: "sale",
              args: [c.newContract, i + 1],
            },
            {
              address: c.newContract,
              abi: zoraCreator1155ImplABI,
              functionName: "getTokenInfo",
              args: [i + 1],
            },
          ];
        })
        .flat();
    })
    .flat();
  const returnValues: any = await publicClient.multicall({
    contracts: calls as any,
  });
  const priceCollections: Address[] = [];
  for (let i = 0; i < returnValues.length; i += 3) {
    const totalMinted = returnValues[i + 2].result?.totalMinted;
    const tokenPrice = returnValues[i].result?.pricePerToken as bigint;
    if (totalMinted > BigInt(0) && tokenPrice > BigInt(0)) {
      if (!priceCollections.includes(calls[i].args[0] as Address))
        priceCollections.push(calls[i].args[0] as Address);
    }
  }
  const promise = priceCollections
    .map(async (c) => {
      const response = await fetch(`/api/dune/purchased?tokenContract=${c}`);
      if (!response.ok) {
        console.log("ziad error");
        return [];
      }
      const data = await response.json();
      return data;
    })
    .flat();
  const purchasedEvents = await Promise.all(promise);
  let sum = BigInt(0);
  purchasedEvents.map((e) => {
    sum += BigInt(e.value);
  });
  return formatEther(sum);
};

export default getTotalEarnings;
