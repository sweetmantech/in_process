import { APP_URL } from "@/lib/og/consts";
import { Metadata } from "next";
import { TimelineApiProvider as TimelineProvider } from "@/providers/TimelineApiProvider";
import TimelinePage from "@/components/Timeline/TimelinePage";

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
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "In Process",
      imageUrl: `${APP_URL}/site_preview.png`,
      aspectRatio: "1:1",
      button: {
        title: "Open",
        action: {
          type: "launch_frame",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "In Process",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/site_preview.png`,
          splashBackgroundColor: "#e4e0db",
        },
      },
    }),
  },
};

const Timeline = () => {
  return (
    <TimelineProvider>
      <TimelinePage />
    </TimelineProvider>
  );
};

export default Timeline;
