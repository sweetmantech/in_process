import Image from "next/image";
import { type SyntheticEvent } from "react";

interface VideoPreviewProps {
  thumbnail?: string;
  onPlay: (e: SyntheticEvent) => void;
  onStopPropagation: (e: SyntheticEvent) => void;
  isLoading?: boolean;
}

const VideoPreview = ({ thumbnail, onPlay, onStopPropagation, isLoading }: VideoPreviewProps) => (
  <div
    className="relative flex w-full cursor-pointer items-center justify-center rounded-md bg-grey-moss-900"
    onClick={onPlay}
    onMouseDown={onStopPropagation}
    onPointerDown={onStopPropagation}
    onTouchStart={onStopPropagation}
  >
    {thumbnail && (
      <Image
        src={thumbnail}
        alt="Video thumbnail"
        width={600}
        height={600}
        sizes="(max-width: 768px) 100vw, 600px"
        className="h-auto w-full rounded-md"
      />
    )}
    {!thumbnail && <div className="aspect-video w-full" />}
    <div className="absolute inset-0 flex items-center justify-center">
      {isLoading ? (
        <div className="size-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      ) : (
        <div className="flex size-16 items-center justify-center rounded-full bg-black/50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </div>
  </div>
);

export default VideoPreview;
