"use client";

import useMediaContent from "@/hooks/useMediaContent";
import PdfContent from "./PdfContent";
import AudioContent from "./AudioContent";
import VideoContent from "./VideoContent";
import HtmlContent from "./HtmlContent";
import TextContent from "./TextContent";
import ImageContent from "./ImageContent";
import { MomentMetadata } from "@/types/moment";
import { getYoutubeVideoId } from "@/lib/url/getYoutubeVideoId";
import YoutubeContent from "./YoutubeContent";

interface ContentRendererProps {
  metadata?: MomentMetadata;
  variant?: "fill" | "natural";
  onRefresh?: () => Promise<string | undefined | void>;
}

const ContentRendererInner = ({ metadata, variant = "fill", onRefresh }: ContentRendererProps) => {
  const {
    mimeType,
    rawAnimationUri,
    rawContentUri,
    rawImageUri,
    animationUrl,
    animationLoading,
    contentUrl,
    contentLoading,
  } = useMediaContent(metadata);

  const youtubeId = getYoutubeVideoId(metadata?.external_url ?? "");
  if (youtubeId) return <YoutubeContent videoId={youtubeId} />;

  if (mimeType.includes("pdf"))
    return <PdfContent animationLoading={animationLoading} animationUrl={animationUrl} />;

  if (mimeType.includes("audio"))
    return (
      <AudioContent rawAnimationUri={rawAnimationUri || rawContentUri} rawImageUri={rawImageUri} />
    );

  if (mimeType.includes("video"))
    return (
      <VideoContent
        rawAnimationUri={rawAnimationUri || rawContentUri}
        rawImageUri={rawImageUri}
        variant={variant}
        onRefresh={onRefresh}
      />
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
      rawImageUri={rawImageUri}
      alt={metadata?.name || metadata?.description || "Moment image"}
      variant={variant}
    />
  );
};

export default ContentRendererInner;
