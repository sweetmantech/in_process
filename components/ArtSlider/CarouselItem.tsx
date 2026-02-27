"use client";

import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "@/components/VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";
import Writing from "../Renderers/Writing";
import ErrorContent from "../Renderers/ErrorContent";
import { TokenMetadataJson } from "@/lib/protocolSdk";
import BlurImage from "@/components/BlurImage";
import { Skeleton } from "@/components/ui/skeleton";
import useArweaveUrl from "@/hooks/useArweaveUrl";

interface CarouselItemProps {
  metadata: TokenMetadataJson;
}

const CarouselItem = ({ metadata }: CarouselItemProps) => {
  const mimeType = metadata?.content?.mime || "";
  const rawAnimationUri = metadata.animation_url || "";
  const rawImageUri = metadata.image || "";

  // Resolve Arweave URLs via Wayfinder (fastest verified gateway)
  const { url: animationUrl, isLoading: animationLoading } = useArweaveUrl(rawAnimationUri);
  const { url: contentUrl, isLoading: contentLoading } = useArweaveUrl(
    metadata.content?.uri || ""
  );

  if (mimeType.includes("pdf")) {
    if (animationLoading) return <Skeleton className="size-full" />;
    if (!animationUrl) return <ErrorContent />;
    return <PdfViewer fileUrl={animationUrl} />;
  }
  if (mimeType.includes("audio")) {
    if (!rawAnimationUri) return <ErrorContent />;
    return (
      <AudioPlayer
        thumbnailUrl={rawImageUri || "/images/placeholder.png"}
        audioUrl={rawAnimationUri}
      />
    );
  }
  if (mimeType.includes("video")) {
    if (!rawAnimationUri) return <ErrorContent />;
    return (
      <div className="flex size-full justify-center">
        <VideoPlayer url={rawAnimationUri} thumbnail={rawImageUri || undefined} />
      </div>
    );
  }

  if (mimeType.includes("html")) {
    // Only allow IPFS/Arweave URLs in iframes to prevent phishing and malicious content
    if (!isSafeIframeUrl(rawAnimationUri)) {
      return (
        <div className="flex size-full items-center justify-center p-4 text-center">
          <p className="text-grey-moss-400">
            HTML content from external URLs is not allowed for security reasons. Please use IPFS or
            Arweave URLs.
          </p>
        </div>
      );
    }
    if (animationLoading) return <Skeleton className="size-full" />;
    if (!animationUrl) return <ErrorContent />;
    return (
      <div className="flex size-full justify-center">
        <iframe
          src={animationUrl}
          className="w-full"
          title={metadata?.name || "Embedded content"}
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
    );
  }
  if (mimeType.includes("text/plain")) {
    if (contentLoading) return <Skeleton className="size-full" />;
    if (!contentUrl) return <ErrorContent />;
    return (
      <div className="size-full">
        <Writing fileUrl={contentUrl} description={metadata?.description || ""} />
      </div>
    );
  }
  return (
    <BlurImage
      src={rawImageUri || "/images/placeholder.png"}
      alt="Token Image."
      width={600}
      height={600}
      sizes="(max-width: 768px) 100vw, 600px"
      className="h-auto w-full"
    />
  );
};

export default CarouselItem;
