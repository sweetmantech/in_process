import { useEffect } from "react";
import { useAudioProvider } from ".";
import Image from "next/image";
import getStreamingUrl from "@/lib/audio/getStreamingUrl";
import Controls from "./Controls";
import DiscPlaceholder from "./DiscPlaceholder";

const AudioPlayer = ({ thumbnailUrl, audioUrl }: { thumbnailUrl?: string; audioUrl: string }) => {
  const { audioSrc, setAudioSrc } = useAudioProvider();

  useEffect(() => {
    const isBlob = audioUrl.startsWith("blob:");
    const src = isBlob ? audioUrl : getStreamingUrl(audioUrl);
    if (audioSrc !== src) {
      setAudioSrc(src);
    }
  }, [audioUrl, audioSrc, setAudioSrc]);

  return (
    <div className="relative flex size-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950">
      {/* Blurred background - Apple Music style */}
      {thumbnailUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            className="scale-110 blur-3xl opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Album Art */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center p-3">
        <div className="relative aspect-square w-full max-w-[70%] overflow-hidden rounded-lg shadow-2xl sm:max-w-[95%]">
          {thumbnailUrl ? (
            <Image src={thumbnailUrl} alt="Audio cover" fill className="object-cover" unoptimized />
          ) : (
            <DiscPlaceholder />
          )}
        </div>
      </div>

      <Controls />
    </div>
  );
};

export default AudioPlayer;
