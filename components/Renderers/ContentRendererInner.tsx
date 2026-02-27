"use client";

import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { usePathname } from "next/navigation";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "@/components/VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";
import Writing from "./Writing";
import ErrorContent from "./ErrorContent";
import { TokenMetadataJson } from "@/lib/protocolSdk";
import BlurImage from "@/components/BlurImage";
import { Skeleton } from "@/components/ui/skeleton";
import useMediaContent from "@/hooks/useMediaContent";

interface ContentRendererProps {
  metadata: TokenMetadataJson;
  variant?: "fill" | "natural";
}

const ContentRendererInner = ({ metadata, variant = "fill" }: ContentRendererProps) => {
  const pathname = usePathname();
  const isCollect = pathname.includes("/collect");
  const {
    mimeType,
    rawAnimationUri,
    rawImageUri,
    animationUrl,
    animationLoading,
    contentUrl,
    contentLoading,
  } = useMediaContent(metadata);

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
      <VideoPlayer url={rawAnimationUri} thumbnail={rawImageUri || undefined} variant={variant} />
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
      <iframe
        src={animationUrl}
        className="w-full"
        title={metadata?.name || "Embedded content"}
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  if (mimeType.includes("text/plain")) {
    if (contentLoading) return <Skeleton className="size-full" />;
    if (!contentUrl) return <ErrorContent />;
    return <Writing fileUrl={contentUrl} description={metadata?.description || ""} />;
  }

  if (variant === "natural") {
    return (
      <BlurImage
        src={(isCollect && rawAnimationUri) || rawImageUri || "/images/placeholder.png"}
        alt={metadata?.name || metadata?.description || "Moment image"}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 800px"
        draggable={false}
        style={{ width: "100%", height: "auto" }}
      />
    );
  }

  return (
    <BlurImage
      src={(isCollect && rawAnimationUri) || rawImageUri || "/images/placeholder.png"}
      alt={metadata?.name || metadata?.description || "Moment image"}
      fill
      sizes="(max-width: 768px) 100vw, 800px"
      draggable={false}
      style={{ objectFit: "contain", objectPosition: "center" }}
    />
  );
};

export default ContentRendererInner;
