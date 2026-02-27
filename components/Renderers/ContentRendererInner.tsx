"use client";

import { usePathname } from "next/navigation";
import { TokenMetadataJson } from "@/lib/protocolSdk";
import useMediaContent from "@/hooks/useMediaContent";
import PdfContent from "./PdfContent";
import AudioContent from "./AudioContent";
import VideoContent from "./VideoContent";
import HtmlContent from "./HtmlContent";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";

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

  if (mimeType.includes("pdf"))
    return <PdfContent animationLoading={animationLoading} animationUrl={animationUrl} />;

  if (mimeType.includes("audio"))
    return <AudioContent rawAnimationUri={rawAnimationUri} rawImageUri={rawImageUri} />;

  if (mimeType.includes("video"))
    return (
      <VideoContent rawAnimationUri={rawAnimationUri} rawImageUri={rawImageUri} variant={variant} />
    );

  if (mimeType.includes("html"))
    return (
      <HtmlContent
        rawAnimationUri={rawAnimationUri}
        animationLoading={animationLoading}
        animationUrl={animationUrl}
        title={metadata?.name}
      />
    );

  if (mimeType.includes("text/plain"))
    return (
      <TextContent
        contentLoading={contentLoading}
        contentUrl={contentUrl}
        description={metadata?.description || ""}
      />
    );

  return (
    <ImageContent
      isCollect={isCollect}
      rawAnimationUri={rawAnimationUri}
      rawImageUri={rawImageUri}
      alt={metadata?.name || metadata?.description || "Moment image"}
      variant={variant}
    />
  );
};

export default ContentRendererInner;
