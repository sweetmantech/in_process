import VideoPlayer from "@/components/VideoPlayer";
import ErrorContent from "./ErrorContent";

interface VideoContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
  variant: "fill" | "natural";
}

const VideoContent = ({ rawAnimationUri, rawImageUri, variant }: VideoContentProps) => {
  if (!rawAnimationUri) return <ErrorContent />;
  return (
    <VideoPlayer url={rawAnimationUri} thumbnail={rawImageUri || undefined} variant={variant} />
  );
};

export default VideoContent;
