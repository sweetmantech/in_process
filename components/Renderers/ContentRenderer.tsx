import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { usePathname } from "next/navigation";
import { Metadata } from "@/types/token";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import useIsMobile from "@/hooks/useIsMobile";
import Writing from "./Writing";

interface ContentRendererProps {
  metadata: Metadata;
}

const ContentRenderer = ({ metadata }: ContentRendererProps) => {
  const mimeType = metadata?.content?.mime || "";
  const pathname = usePathname();
  const isCollect = pathname.includes("/collect");
  const isMobile = useIsMobile();

  if (mimeType.includes("pdf"))
    return (
      <PdfViewer fileUrl={getFetchableUrl(metadata.animation_url) || ""} />
    );
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
          className="w-full"
        />
      </div>
    );
  if (mimeType.includes("text/plain"))
    return (
      <Writing
        fileUrl={getFetchableUrl(metadata.content.uri) || ""}
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
        alt="Token Image."
        className="absolute inset-0 w-full h-full"
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
