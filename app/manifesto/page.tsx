import ManifestoPage from "@/components/ManifestoPage";
import { APP_URL } from "@/lib/og/consts";
import { Metadata } from "next";

const title = "Manifesto"
	
export const metadata: Metadata = {
  title: `${title} - In Process`,
  description: "Imagined by LATASHÁ",
  openGraph: {
    title: `${title} - In Process`,
    description: "Imagined by LATASHÁ",
    images: [`${APP_URL}/manifesto_preview.png`],
  },
};

const Manifesto = () => <ManifestoPage />;

export default Manifesto;
