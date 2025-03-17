import { Metadata, NextPage } from "next";
import ArtistPage from "@/components/ArtistPage";

export async function generateMetadata({
  params,
}: {
  params: { artistAddress: string };
}): Promise<Metadata> {
  const artistAddress = params.artistAddress;
  return {
    title: "In Process",
    description: "Imagined by LATASHÁ",
    openGraph: {
      title: "In Process",
      description: "Imagined by LATASHÁ",
      images: [
        `https://in-process-seven.vercel.app/api/og/artist?artistAddress=${artistAddress}`,
      ],
    },
  };
}

const Artist: NextPage = () => <ArtistPage />;

export default Artist;
