import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { usePathname } from "next/navigation";
import { MomentMetadata } from "@/types/moment";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import useIsMobile from "@/hooks/useIsMobile";
import Writing from "./Writing";

interface ContentRendererProps {
  metadata: MomentMetadata;
}

const ContentRenderer = ({ metadata }: ContentRendererProps) => {
  const mimeType = metadata?.content?.mime || "";
  const pathname = usePathname();
  const isCollect = pathname.includes("/collect");
  const isMobile = useIsMobile();

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
      <div className="flex size-full justify-center">
        <VideoPlayer url={getFetchableUrl(metadata.animation_url) || ""} />
      </div>
    );

  if (mimeType.includes("html"))
    return (
      <div className="flex size-full justify-center">
        <iframe
          src={getFetchableUrl(metadata.animation_url) || ""}
          className="h-full w-full"
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
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line */}
      <img
        src={
          (isCollect && getFetchableUrl(metadata.animation_url)) ||
          getFetchableUrl(metadata.image) ||
          "/images/placeholder.png"
        }
        alt={metadata?.name || metadata?.description || "Token image"}
        className="absolute inset-0 block h-full w-full object-cover"
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

export default ContentRenderer;
