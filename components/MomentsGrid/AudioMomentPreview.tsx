import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";

interface AudioMomentPreviewProps {
  data: TokenMetadataJson;
}

const AudioMomentPreview = ({ data }: AudioMomentPreviewProps) => {
  const label = data.name || data.description;

  return (
    <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-6 transition-transform duration-300 group-hover:scale-[1.02]">
      {/* Disc - matches DiscPlaceholder style */}
      <div className="relative size-28 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl">
        <div className="absolute inset-0 rounded-full border-2 border-neutral-700/50" />
        <div className="absolute inset-[5%] rounded-full border border-neutral-600/30" />
        <div className="absolute inset-[12%] rounded-full border border-neutral-600/20" />
        <div className="absolute inset-[19%] rounded-full border border-neutral-600/30" />
        <div className="absolute inset-[26%] rounded-full border border-neutral-600/20" />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-700 shadow-inner">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
          <div className="absolute inset-[40%] rounded-full bg-neutral-900 shadow-inner" />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </div>
      {label && (
        <p className="line-clamp-2 px-2 text-center font-archivo text-xs text-neutral-300">
          {label}
        </p>
      )}
    </div>
  );
};

export default AudioMomentPreview;
