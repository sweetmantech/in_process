import { IN_PROCESS_API } from "@/lib/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { CHAIN_ID } from "@/lib/consts";
import { Address, isAddress } from "viem";
import fetchMetadata from "@/lib/arweave/fetchMetadata";
import CollectionPage from "@/components/CollectionPage";
import { getCollectionApi } from "@/lib/collection/getCollectionApi";
import fetchArtistProfile from "@/lib/fetchArtistProfile";
import truncateAddress from "@/lib/truncateAddress";

type Props = {
  params: Promise<{ collectionAddress: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collectionAddress } = await params;
  const { address, chainId } = parseCollectionAddress(collectionAddress);
  if (!address || !isAddress(address)) {
    return { title: "In Process", description: "Imagined by LATASHÁ" };
  }
  const chainIdInt = chainId || CHAIN_ID;

  try {
    const { uri, default_admin } = await getCollectionApi(address, chainIdInt);
    if (!uri) return { title: "In Process", description: "Imagined by LATASHÁ" };
    const username = default_admin.username || truncateAddress(default_admin.address);
    const metadata = await fetchMetadata(uri);
    const title = metadata?.name || "In Process";
    const description = metadata?.description || `Imagined by ${username}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          `${IN_PROCESS_API}/og/moment?collectionAddress=${address}&chainId=${chainIdInt}&tokenId=0`,
        ],
      },
    };
  } catch {
    return { title: "In Process", description: "Imagined by LATASHÁ" };
  }
}

const Collection: NextPage = () => <CollectionPage />;

export default Collection;
