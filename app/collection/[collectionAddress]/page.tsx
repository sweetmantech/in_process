import { IN_PROCESS_API } from "@/lib/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { CHAIN_ID } from "@/lib/consts";
import { isAddress } from "viem";
import fetchMetadata from "@/lib/arweave/fetchMetadata";
import CollectionPage from "@/components/CollectionPage";
import { getCollectionApi } from "@/lib/collection/getCollectionApi";

type Props = {
  params: Promise<{ collection: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  const { address, chainId } = parseCollectionAddress(collection);
  if (!address || !isAddress(address)) {
    return { title: "In Process", description: "Imagined by LATASHÁ" };
  }
  const chainIdInt = chainId || CHAIN_ID;

  try {
    const { uri } = await getCollectionApi(address, chainIdInt);
    if (!uri) return { title: "In Process", description: "Imagined by LATASHÁ" };
    const metadata = await fetchMetadata(uri);
    const title = metadata?.name || "In Process";
    const description = metadata?.description || "Imagined by LATASHÁ";

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
