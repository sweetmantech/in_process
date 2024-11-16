"use client";

import FeedPage from "@/components/FeedPage";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { useParams } from "next/navigation";
import { Address } from "viem";
import * as chains from "viem/chains";

export default function CollectionPage() {
  const params = useParams();
  const collection = params.collection as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];
  return <FeedPage chainId={viemChain.id} address={address as Address} />;
}
