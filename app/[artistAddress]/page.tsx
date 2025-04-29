import { Metadata, NextPage } from "next";
import ArtistPage from "@/components/ArtistPage";
import ProfileProvider from "@/providers/ProfileProvider";
import { APP_URL, VERCEL_OG } from "@/lib/consts";

type Props = {
  params: Promise<{ artistAddress: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { artistAddress } = await params;
  return {
    title: "In Process",
    description: "Imagined by LATASHÁ",
    openGraph: {
      title: "In Process",
      description: "Imagined by LATASHÁ",
      images: [`${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`,
        aspectRatio: "3:2",
        button: {
          title: "Timeline",
          action: {
            type: "launch_frame",
            name: "In Process",
            url: `${APP_URL}/${artistAddress}`,
            iconImageUrl: `${VERCEL_OG}/api/og/artist?artistAddress=${artistAddress}`,
            splashImageUrl: `${VERCEL_OG}/desktop_footer_logo.png`,
            splashBackgroundColor: "#e9ccbb",
          },
        },
      }),
    },
  };
}

const Artist: NextPage = () => (
  <ProfileProvider>
    <ArtistPage />
  </ProfileProvider>
);

export default Artist;
