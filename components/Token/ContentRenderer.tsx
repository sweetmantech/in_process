import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Metadata } from "@/types/token";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";
import useIsMobile from "@/hooks/useIsMobile";

interface ContentRendererProps {
  metadata: Metadata;
}

const ContentRenderer = ({ metadata }: ContentRendererProps) => {
  const mimeType = metadata?.content?.mime || "";
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
      <div
        className="font-archivo bg-grey-moss-100 p-2 rounded-md text-md !normal-case"
        dangerouslySetInnerHTML={{
          __html: metadata.description.replaceAll("\n", "<br/>"),
        }}
      ></div>
    );
  return (
    <div className="grow relative  flex justify-center items-start">
      {/* eslint-disable-next-line */}
      <img
        src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
        alt="Token Image."
        style={{
          imageRendering: isMobile ? "pixelated" : "auto",
        }}
      />
    </div>
  );
};

export default ContentRenderer;
