import MomentPage from "@/components/MomentPage";
import { IN_PROCESS_API, SITE_ORIGINAL_URL } from "@/lib/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { CHAIN_ID } from "@/lib/consts";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { isAddress } from "viem";
import { getMomentApi } from "@/lib/moment/getMomentApi";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  const { address, chainId } = parseCollectionAddress(collection);
  if (!address || !isAddress(address) || !tokenId) {
    return { title: "In Process", description: "Imagined by LATASHÁ" };
  }

  const moment = {
    collectionAddress: address,
    tokenId,
    chainId: chainId || CHAIN_ID,
  };

  try {
    const { uri } = await getMomentApi(moment);
    if (!uri) return { title: "In Process", description: "Imagined by LATASHÁ" };
    const metadata = await fetchTokenMetadata(uri);

    const title = metadata?.name || "In Process";
    const description = metadata?.description || "Imagined by LATASHÁ";

    const frame = {
      version: "next",
      imageUrl: `${IN_PROCESS_API}/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}&chainId=${moment.chainId}`,
      aspectRatio: "3:2",
      button: {
        title: "Collect",
        action: {
          type: "launch_frame",
          name: "In Process",
          url: `${SITE_ORIGINAL_URL}/collect/${collection}/${tokenId}`,
          iconImageUrl: `${IN_PROCESS_API}/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}&chainId=${moment.chainId}`,
          splashImageUrl: `${SITE_ORIGINAL_URL}/desktop_footer_logo.png`,
          splashBackgroundColor: "#e9ccbb",
        },
      },
    };

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          `${IN_PROCESS_API}/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}&chainId=${moment.chainId}`,
        ],
      },
      other: {
        "fc:frame": JSON.stringify(frame),
      },
    };
  } catch {
    return { title: "In Process", description: "Imagined by LATASHÁ" };
  }
}

const Moment: NextPage = () => <MomentPage />;

export default Moment;
