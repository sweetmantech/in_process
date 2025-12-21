import ManifestoPage from "@/components/ManifestoPage";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { Metadata } from "next";

const title = "Manifesto";

export const metadata: Metadata = {
  title: `${title} - In Process`,
  description: "Imagined by LATASHÁ",
  openGraph: {
    title: `${title} - In Process`,
    description: "Imagined by LATASHÁ",
    images: [`${SITE_ORIGINAL_URL}/manifesto_preview.png`],
  },
};

const Manifesto = () => <ManifestoPage />;

export default Manifesto;
