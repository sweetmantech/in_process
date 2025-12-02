import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { usePathname } from "next/navigation";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";
import useIsMobile from "@/hooks/useIsMobile";
import Writing from "../Renderers/Writing";
import { useMomentProvider } from "@/providers/MomentProvider";

/**
 * MetadataDisplay - Displays Moment metadata after creation.
 * This component ONLY handles displaying metadata from useMomentProvider.
 * It does NOT handle preview of blob files during creation.
 */
const MetadataDisplay = () => {
  const { metadata } = useMomentProvider();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (!metadata) {
    return null;
  }

  const mimeType = metadata?.content?.mime || "";
  const isCollect = pathname.includes("/collect");

  if (mimeType.includes("pdf"))
    return <PdfViewer fileUrl={getFetchableUrl(metadata.animation_url) || ""} />;

  if (mimeType.includes("audio")) {
    return (
      <AudioPlayer
        thumbnailUrl={getFetchableUrl(metadata.image) || ""}
        audioUrl={getFetchableUrl(metadata.animation_url) || ""}
      />
    );
  }

  if (mimeType.includes("video"))
    return (
      <div className="size-full flex justify-center">
        <VideoPlayer url={getFetchableUrl(metadata.animation_url) || ""} />
      </div>
    );

  if (mimeType.includes("html"))
    return (
      <div className="size-full flex justify-center">
        <iframe
          src={getFetchableUrl(metadata.animation_url) || ""}
          className="w-full h-full"
          title={metadata?.name || "Embedded content"}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    );

  if (mimeType.includes("text/plain"))
    return (
      <Writing
        fileUrl={getFetchableUrl(metadata?.content?.uri) || ""}
        description={metadata.description}
      />
    );

  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line */}
      <img
        src={
          (isCollect && getFetchableUrl(metadata.animation_url)) ||
          getFetchableUrl(metadata.image) ||
          "/images/placeholder.png"
        }
        alt={metadata?.name || metadata?.description || "Token image"}
        className="absolute inset-0 w-full h-full block"
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{
          imageRendering: isMobile ? "auto" : "pixelated",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default MetadataDisplay;
