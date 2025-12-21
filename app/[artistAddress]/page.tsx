import { Metadata, NextPage } from "next";
import ArtistPage from "@/components/ArtistPage";
import { VERCEL_OG } from "@/lib/og/consts";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";
import getArtistProfile from "@/lib/getArtistProfile";

type Props = {
  params: Promise<{ artistAddress: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artistAddress } = await params;

  const profile = await getArtistProfile(artistAddress as Address);
  const title = profile.username || truncateAddress(artistAddress);
  const description = profile.bio || "Imagined by LATASHÁ";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [`${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`,
        aspectRatio: "3:2",
        button: {
          title: title,
          action: {
            type: "launch_frame",
            name: "In Process",
            url: `${SITE_ORIGINAL_URL}/${artistAddress}`,
            iconImageUrl: `${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`,
            splashImageUrl: `${VERCEL_OG}/desktop_footer_logo.png`,
            splashBackgroundColor: "#e9ccbb",
          },
        },
      }),
    },
  };
}

const Artist: NextPage = () => <ArtistPage />;

export default Artist;
