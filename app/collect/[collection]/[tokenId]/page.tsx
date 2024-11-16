"use client";

import FeedPage from "@/components/FeedPage";
import { ZoraChains } from "@/lib/zora/zoraToViem";
import { ZORA_TO_VIEM } from "@/lib/zora/zoraToViem";
import { Address } from "viem";
import { useParams } from "next/navigation";
import * as chains from "viem/chains";
import { CollectionProvider } from "@/providers/CollectionProvider";

export default function TokenPage() {
  const params = useParams();
  const collection = params.collection as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  return (
    <CollectionProvider chainId={viemChain.id} address={address as Address}>
      <FeedPage chainId={viemChain.id} address={address as Address} />
    </CollectionProvider>
  );
}
