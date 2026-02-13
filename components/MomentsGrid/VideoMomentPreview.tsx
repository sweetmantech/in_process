import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import FilmPlaceholder from "@/components/VideoPlayer/FilmPlaceholder";

interface VideoMomentPreviewProps {
  data: TokenMetadataJson;
}

const VideoMomentPreview = ({ data }: VideoMomentPreviewProps) => {
  const label = data.name || data.description;

  return (
    <div className="absolute inset-0 z-[1] flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="flex-1 [&>div]:!aspect-auto [&>div]:!h-full [&>div]:!rounded-none">
        <FilmPlaceholder />
      </div>
      {label && (
        <div className="bg-neutral-900 px-3 py-2">
          <p className="line-clamp-2 font-archivo text-xs text-neutral-300">{label}</p>
        </div>
      )}
    </div>
  );
};

export default VideoMomentPreview;
