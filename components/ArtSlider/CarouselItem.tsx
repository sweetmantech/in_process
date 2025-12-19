import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { MomentMetadata } from "@/types/moment";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";
import Writing from "../Renderers/Writing";

interface CarouselItemProps {
  metadata: MomentMetadata;
}

const CarouselItem = ({ metadata }: CarouselItemProps) => {
  const mimeType = metadata?.content?.mime || "";

  if (mimeType.includes("pdf")) {
    const pdfUrl = getFetchableUrl(metadata.animation_url);
    if (!pdfUrl) return null;
    return <PdfViewer fileUrl={pdfUrl} />;
  }
  if (mimeType.includes("audio")) {
    const audioUrl = getFetchableUrl(metadata.animation_url);
    const thumbnailUrl = getFetchableUrl(metadata.image);
    if (!audioUrl) return null;
    return (
      <AudioPlayer thumbnailUrl={thumbnailUrl || "/images/placeholder.png"} audioUrl={audioUrl} />
    );
  }
  if (mimeType.includes("video")) {
    const videoUrl = getFetchableUrl(metadata.animation_url);
    if (!videoUrl) return null;
    return (
      <div className="flex size-full justify-center">
        <VideoPlayer url={videoUrl} />
      </div>
    );
  }

  if (mimeType.includes("html")) {
    const iframeUrl = metadata.animation_url;
    const fetchableUrl = getFetchableUrl(iframeUrl);

    if (!fetchableUrl)
      return (
        <div className="flex size-full items-center justify-center p-4 text-center">
          <p className="text-grey-moss-400">Error loading HTML content.</p>
        </div>
      );
    // Only allow IPFS/Arweave URLs in iframes to prevent phishing and malicious content
    if (!isSafeIframeUrl(iframeUrl)) {
      return (
        <div className="flex size-full items-center justify-center p-4 text-center">
          <p className="text-grey-moss-400">
            HTML content from external URLs is not allowed for security reasons. Please use IPFS or
            Arweave URLs.
          </p>
        </div>
      );
    }
    return (
      <div className="flex size-full justify-center">
        <iframe
          src={fetchableUrl}
          className="w-full"
          title={metadata?.name || "Embedded content"}
          sandbox="allow-same-origin"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    );
  }
  if (mimeType.includes("text/plain")) {
    const fileUrl = getFetchableUrl(metadata.content.uri);
    return (
      <div className="size-full">
        <Writing fileUrl={fileUrl || ""} description={metadata.description} />
      </div>
    );
  }
  return (
    <div className="relative size-full grow">
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
