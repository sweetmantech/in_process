import MomentPage from "@/components/MomentPage";
import { APP_URL, VERCEL_OG } from "@/lib/og/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { CHAIN_ID } from "@/lib/consts";
import { getMomentAdvancedInfo } from "@/lib/moment/getMomentAdvancedInfo";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  const { address } = parseCollectionAddress(collection);
  if (!address) throw new Error("Collection address is required");
  if (!tokenId) throw new Error("Token ID is required");

  const moment = {
    collectionAddress: address.toLowerCase() as `0x${string}`,
    tokenId,
    chainId: CHAIN_ID,
  };
  const { uri } = await getMomentAdvancedInfo(moment);
  if (!uri) throw Error("failed to get moment uri");
  const metadata = await fetchTokenMetadata(uri);

  const title = metadata?.name || "In Process";
  const description = metadata?.description || "Imagined by LATASHÁ";

  const frame = {
    version: "next",
    imageUrl: `${VERCEL_OG}/api/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}`,
    aspectRatio: "3:2",
    button: {
      title: "Collect",
      action: {
        type: "launch_frame",
        name: "In Process",
        url: `${APP_URL}/collect/${collection}/${tokenId}`,
        iconImageUrl: `${VERCEL_OG}/api/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}`,
        splashImageUrl: `${VERCEL_OG}/desktop_footer_logo.png`,
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
        `${VERCEL_OG}/api/og/moment?collectionAddress=${moment.collectionAddress}&tokenId=${moment.tokenId}`,
      ],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

const Moment: NextPage = () => <MomentPage />;

export default Moment;
