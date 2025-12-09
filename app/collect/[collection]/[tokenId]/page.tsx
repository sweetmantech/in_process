import MomentPage from "@/components/MomentPage";
import fetchTokenMetadata from "@/lib/fetchTokenMetadata";
import { APP_URL, VERCEL_OG } from "@/lib/og/consts";
import { Metadata, NextPage } from "next";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

type Props = {
  params: Promise<{ collection: string; tokenId: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId, collection } = await params;
  const { address } = parseCollectionAddress(collection);
  const metadata = await fetchTokenMetadata(collection as string, tokenId as string);

  const title = metadata?.name || "In Process";
  const description = metadata?.description || "Imagined by LATASHÁ";

  const addressParam = address || "";

  const frame = {
    version: "next",
    imageUrl: `${VERCEL_OG}/api/og/token?collection=${addressParam}&tokenId=${tokenId}`,
    aspectRatio: "3:2",
    button: {
      title: "Collect",
      action: {
        type: "launch_frame",
        name: "In Process",
        url: `${APP_URL}/collect/${collection}/${tokenId}`,
        iconImageUrl: `${VERCEL_OG}/api/og/token?collection=${addressParam}&tokenId=${tokenId}`,
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
      images: [`${VERCEL_OG}/api/og/token?collection=${addressParam}&tokenId=${tokenId}`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

const Moment: NextPage = () => <MomentPage />;

export default Moment;
