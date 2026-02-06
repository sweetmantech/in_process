import Image from "next/image";
import { type KeyboardEvent, type SyntheticEvent } from "react";
import FilmPlaceholder from "./FilmPlaceholder";

interface VideoPreviewProps {
  thumbnail?: string;
  onPlay: (e: SyntheticEvent) => void;
  onStopPropagation: (e: SyntheticEvent) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const VideoPreview = ({
  thumbnail,
  onPlay,
  onStopPropagation,
  isLoading,
  isError,
}: VideoPreviewProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.key === " ") e.preventDefault();
      onStopPropagation(e);
      onPlay(e);
    }
  };

  return (
    <div
      className="relative flex w-full cursor-pointer items-center justify-center rounded-md bg-grey-moss-900"
      role="button"
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={handleKeyDown}
      onMouseDown={onStopPropagation}
      onPointerDown={onStopPropagation}
      onTouchStart={onStopPropagation}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="Video thumbnail"
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, 600px"
          className="h-auto w-full rounded-md"
        />
      ) : (
        <FilmPlaceholder />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-md bg-black/60">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-base font-medium text-white/90">Video unavailable</span>
          </div>
        ) : isLoading ? (
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
};

export default VideoPreview;
