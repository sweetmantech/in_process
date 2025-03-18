import { Metadata, NextPage } from "next";
import ArtistPage from "@/components/ArtistPage";
import { VERCEL_OG } from "../api/og/artist/route";

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
  };
}

const Artist: NextPage = () => <ArtistPage />;

export default Artist;
