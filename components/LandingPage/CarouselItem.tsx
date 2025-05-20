import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { Metadata } from "@/types/token";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";
import Writing from "../Renderers/Writing";

interface CarouselItemProps {
  metadata: Metadata;
}

const CarouselItem = ({ metadata }: CarouselItemProps) => {
  const mimeType = metadata?.content?.mime || "";

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
      <div className="size-full">
        <Writing
          fileUrl={getFetchableUrl(metadata.content.uri) || ""}
          description={metadata.description}
        />
      </div>
    );
  return (
    <div className="grow relative size-full">
      {/* eslint-disable-next-line */}
      <img
        src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
        alt="Token Image."
        className="w-full"
      />
    </div>
  );
};

export default CarouselItem;
