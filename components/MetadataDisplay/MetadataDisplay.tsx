"use client";

import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { usePathname } from "next/navigation";
import PdfViewer from "../Renderers/PdfViewer";
import VideoPlayer from "@/components/VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";
import Writing from "../Renderers/Writing";
import { useMomentProvider } from "@/providers/MomentProvider";
import BlurImage from "@/components/BlurImage";
import { Skeleton } from "@/components/ui/skeleton";
import useArweaveUrl from "@/hooks/useArweaveUrl";
import ErrorContent from "../Renderers/ErrorContent";

/**
 * MetadataDisplay - Displays Moment metadata after creation.
 * This component ONLY handles displaying metadata from useMomentProvider.
 * It does NOT handle preview of blob files during creation.
 */
const MetadataDisplay = () => {
  const { metadata } = useMomentProvider();
  const pathname = usePathname();

  const mimeType = metadata?.content?.mime || "";
  const isCollect = pathname.includes("/collect");

  // Raw URIs for proxy APIs (stream/image) — send ar:// directly
  const rawAnimationUri = metadata?.animation_url || "";
  const rawImageUri = metadata?.image || "";
  const rawContentUri = metadata?.content?.uri || "";

  // Resolve Arweave URLs via Wayfinder (fastest verified gateway)
  const { url: animationUrl, isLoading: animationLoading } = useArweaveUrl(rawAnimationUri);
  const { url: contentUrl, isLoading: contentLoading } = useArweaveUrl(rawContentUri);

  if (!metadata) {
    return null;
  }

  if (mimeType.includes("pdf")) {
    if (animationLoading) return <Skeleton className="size-full" />;
    if (!animationUrl) return <ErrorContent />;
    return <PdfViewer fileUrl={animationUrl} />;
  }

  if (mimeType.includes("audio")) {
    if (!rawAnimationUri) return null;
    return (
      <AudioPlayer
        thumbnailUrl={rawImageUri || "/images/placeholder.png"}
        audioUrl={rawAnimationUri}
      />
    );
  }

  if (mimeType.includes("video")) {
    if (!rawAnimationUri) return null;
    return (
      <div className="flex size-full justify-center">
        <VideoPlayer url={rawAnimationUri} thumbnail={rawImageUri || undefined} />
      </div>
    );
  }

  if (mimeType.includes("html")) {
    const iframeUrl = rawAnimationUri;
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
    if (animationLoading) return <Skeleton className="size-full" />;
    if (!animationUrl) {
      return <ErrorContent />;
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
    if (contentLoading) return <Skeleton className="size-full" />;
    if (!contentUrl) return <ErrorContent />;
    return <Writing fileUrl={contentUrl} description={metadata.description} />;
  }

  return (
    <div className="relative h-full w-full">
      <BlurImage
        src={(isCollect && rawAnimationUri) || rawImageUri || "/images/placeholder.png"}
        alt={metadata?.name || metadata?.description || "Token image"}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        draggable={false}
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default MetadataDisplay;
