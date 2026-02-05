"use client";

import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isSafeIframeUrl } from "@/lib/protocolSdk/ipfs/isSafeIframeUrl";
import { usePathname } from "next/navigation";
import PdfViewer from "./PdfViewer";
import VideoPlayer from "./VideoPlayer";
import { AudioPlayer } from "@/components/AudioPlayer";
import Writing from "./Writing";
import ErrorContent from "./ErrorContent";
import { TokenMetadataJson } from "@/lib/protocolSdk";
import BlurImage from "@/components/BlurImage";

interface ContentRendererProps {
  metadata: TokenMetadataJson;
}

const ContentRendererInner = ({ metadata }: ContentRendererProps) => {
  const pathname = usePathname();
  const mimeType = metadata?.content?.mime || "";
  const isCollect = pathname.includes("/collect");

  // Compute all URLs upfront
  const animationUrl = getFetchableUrl(metadata.animation_url);
  const imageUrl = getFetchableUrl(metadata.image);
  const contentUri = getFetchableUrl(metadata?.content?.uri);

  if (mimeType.includes("pdf")) {
    if (!animationUrl) return <ErrorContent />;
    return <PdfViewer fileUrl={animationUrl} />;
  }

  if (mimeType.includes("audio")) {
    if (!animationUrl) return <ErrorContent />;
    return (
      <AudioPlayer thumbnailUrl={imageUrl || "/images/placeholder.png"} audioUrl={animationUrl} />
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
    if (!contentUri) return <ErrorContent />;
    return <Writing fileUrl={contentUri} description={metadata?.description || ""} />;
  }

  return (
    <div className="relative h-full w-full">
      <BlurImage
        src={(isCollect && animationUrl) || imageUrl || "/images/placeholder.png"}
        alt={metadata?.name || metadata?.description || "Moment image"}
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

export default ContentRendererInner;
