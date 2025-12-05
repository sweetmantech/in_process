import { Metadata, NextPage } from "next";
import CollectionPage from "@/components/CollectionPage";
import truncateAddress from "@/lib/truncateAddress";
import getCollectionProfile from "@/lib/getCollectionProfile";
import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { Address } from "viem";

type Props = {
  params: Promise<{ collectionAddress: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collectionAddress } = await params;
  const decodedAddress = decodeURIComponent(collectionAddress);
  const [chain, address] = decodedAddress.split(":");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  const profile = await getCollectionProfile(address as Address, viemChain.id);
  const title = profile.name || truncateAddress(address);

  return {
    title: title,
    description: `Collection timeline for ${title}`,
  };
}

const Collection: NextPage = () => <CollectionPage />;

export default Collection;
