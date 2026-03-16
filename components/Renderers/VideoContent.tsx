"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import ErrorContent from "./ErrorContent";

interface VideoContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
  variant: "fill" | "natural";
  onRefresh?: () => Promise<string | undefined | void>;
}

const VideoContent = ({ rawAnimationUri, rawImageUri, variant, onRefresh }: VideoContentProps) => {
  const [videoUri, setVideoUri] = useState(rawAnimationUri);

  useEffect(() => {
    setVideoUri(rawAnimationUri);
  }, [rawAnimationUri]);

  const handleError = async (): Promise<boolean> => {
    if (!onRefresh || !videoUri.includes("stream.mux.com")) return false;
    const freshUri = await onRefresh();
    if (freshUri && freshUri !== videoUri) {
      setVideoUri(freshUri);
      return true;
    }
    return false;
  };

  if (!videoUri) return <ErrorContent />;
  return (
    <VideoPlayer
      url={videoUri}
      thumbnail={rawImageUri || undefined}
      variant={variant}
      onError={handleError}
    />
  );
};

export default VideoContent;
