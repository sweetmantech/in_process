import { IN_PROCESS_API, SITE_ORIGINAL_URL, CHAIN_ID } from "@/lib/consts";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Metadata } from "next";

export const generateMomentMetadata = async (
  params: Promise<Record<string, string>>,
  pathPrefix: string
): Promise<Metadata> => {
  const { collection, tokenId } = await params;

  const { address, chainId } = parseCollectionAddress(collection);
  if (!address || !tokenId) return {};

  const resolvedChainId = chainId || CHAIN_ID;
  const pageUrl = `${SITE_ORIGINAL_URL}${pathPrefix}/${collection}/${tokenId}`;
  const imageUrl = `${IN_PROCESS_API}/og/moment?collectionAddress=${address}&tokenId=${tokenId}&chainId=${resolvedChainId}`;

  const frame = {
    version: "next",
    imageUrl,
    aspectRatio: "3:2",
    button: {
      title: "Collect",
      action: {
        type: "launch_frame",
        name: "In Process",
        url: pageUrl,
        iconImageUrl: imageUrl,
        splashImageUrl: `${SITE_ORIGINAL_URL}/desktop_footer_logo.png`,
        splashBackgroundColor: "#e9ccbb",
      },
    },
  };

  return {
    openGraph: {
      images: [imageUrl],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
};
