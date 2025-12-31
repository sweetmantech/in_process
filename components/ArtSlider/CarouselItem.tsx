import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import AudioPlayer from "../Renderers/AudioPlayer";
import Writing from "../Renderers/Writing";
import ErrorContent from "../Renderers/ErrorContent";
import { TokenMetadataJson } from "@/lib/protocolSdk";

interface CarouselItemProps {
  metadata: TokenMetadataJson;
}

const CarouselItem = ({ metadata }: CarouselItemProps) => {
  const mimeType = metadata?.content?.mime || "";
  const animationUrl = getFetchableUrl(metadata.animation_url);

  if (mimeType.includes("pdf")) {
    if (!animationUrl) return <ErrorContent />;
    return <PdfViewer fileUrl={animationUrl} />;
  }
  if (mimeType.includes("audio")) {
    if (!animationUrl) return <ErrorContent />;
    const thumbnailUrl = getFetchableUrl(metadata.image);
    return (
      <AudioPlayer
        thumbnailUrl={thumbnailUrl || "/images/placeholder.png"}
        audioUrl={animationUrl}
      />
    );
  }
  if (mimeType.includes("video")) {
    if (!animationUrl) return <ErrorContent />;
    return (
      <div className="flex size-full justify-center">
        <VideoPlayer url={animationUrl} />
      </div>
    );
  }

  if (mimeType.includes("html")) {
    const iframeUrl = metadata.animation_url;
    if (!animationUrl) return <ErrorContent />;

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
          src={animationUrl}
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
    const fileUrl = getFetchableUrl(metadata.content?.uri);
    if (!fileUrl) return <ErrorContent />;
    return (
      <div className="size-full">
        <Writing fileUrl={fileUrl} description={metadata?.description || ""} />
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
