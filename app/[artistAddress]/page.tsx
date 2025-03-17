import { Metadata, NextPage } from "next";
import ArtistPage from "@/components/ArtistPage";

export const metadata: Metadata = {
  title: "In Process",
  description: "Imagined by LATASHÁ",
  openGraph: {
    title: "In Process",
    description: "Imagined by LATASHÁ",
    images: [
      `https://in-process-seven.vercel.app/api/og/artist?artistAddress=0x323e8BCB41ae2454c3f4899e094c599AaB6b84BC`,
    ],
  },
};

const Artist: NextPage = () => <ArtistPage />;

export default Artist;
