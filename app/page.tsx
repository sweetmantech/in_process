import LandingPage from "@/components/LandingPage/LandingPage";
import { APP_URL } from "@/lib/og/consts";
import { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "In Process",
  description: "A Collective Onchain Timeline for artists",
  openGraph: {
    title: "In Process",
    description: "A Collective Onchain Timeline for artists",
    images: [`${APP_URL}/site_preview.png`],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${APP_URL}/site_preview.png`,
      aspectRatio: "1:1",
      button: {
        title: "Open",
        action: {
          type: "launch_frame",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/site_preview.png`,
          splashBackgroundColor: "#e4e0db",
        },
      },
    }),
  },
};

const HomePage = () => <LandingPage />;

export default HomePage;
