import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { usePathname } from "next/navigation";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "../Renderers/VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";
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

  // Compute all URLs upfront
  const animationUrl = getFetchableUrl(metadata.animation_url);
  const imageUrl = getFetchableUrl(metadata.image);
  const contentUri = getFetchableUrl(metadata?.content?.uri);

  if (mimeType.includes("pdf")) {
    if (!animationUrl)
      return (
        <div className="flex size-full items-center justify-center p-4 text-center">
          <p className="text-grey-moss-400">Error loading Moment Content.</p>
        </div>
      );
    return <PdfViewer fileUrl={animationUrl} />;
  }

  if (mimeType.includes("audio")) {
    if (!animationUrl) return null;
    return (
      <AudioPlayer thumbnailUrl={imageUrl || "/images/placeholder.png"} audioUrl={animationUrl} />
    );
  }

  if (mimeType.includes("video")) {
    if (!animationUrl) return null;
    return (
      <div className="flex size-full justify-center">
        <VideoPlayer url={animationUrl} />
      </div>
    );
  }

  if (mimeType.includes("html")) {
    const iframeUrl = metadata.animation_url;
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
    if (!animationUrl) {
      return (
        <div className="flex size-full items-center justify-center p-4 text-center">
          <p className="text-grey-moss-400">Error loading HTML content.</p>
        </div>
      );
    }
    return (
      <div className="flex size-full justify-center">
        <iframe
          src={animationUrl}
          className="h-full w-full"
          title={metadata?.name || "Embedded content"}
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    );
  }

  if (mimeType.includes("text/plain")) {
    return <Writing fileUrl={contentUri || ""} description={metadata.description} />;
  }

  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line */}
      <img
        src={(isCollect && animationUrl) || imageUrl || "/images/placeholder.png"}
        alt={metadata?.name || metadata?.description || "Token image"}
        className="absolute inset-0 block h-full w-full"
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
