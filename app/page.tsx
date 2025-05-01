import LandingPage from "@/components/LandingPage/LandingPage";
import { APP_URL } from "@/lib/og/consts";
import { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "In Process",
  description: "Imagined by LATASHÁ",
  openGraph: {
    title: "In Process",
    description: "Imagined by LATASHÁ",
    images: [`${APP_URL}/site_preview.png`],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${APP_URL}/site_preview.png`,
      aspectRatio: "1:1",
      button: {
        title: "Create",
        action: {
          type: "launch_frame",
          name: "In Process",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/site_preview.png`,
          splashBackgroundColor: "#abaaa9",
        },
      },
    }),
  },
};

const HomePage = () => <LandingPage />;

export default HomePage;
