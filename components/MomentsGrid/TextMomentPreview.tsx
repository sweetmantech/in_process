"use client";

import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import useTextContent from "@/hooks/useTextContent";

interface TextMomentPreviewProps {
  data: TokenMetadataJson;
}

const TextMomentPreview = ({ data }: TextMomentPreviewProps) => {
  const text = useTextContent(data);

  return (
    <div className="absolute inset-0 z-[1] flex items-start overflow-hidden bg-grey-eggshell p-4 pt-6 transition-transform duration-300 group-hover:scale-[1.02]">
      <p className="line-clamp-[8] whitespace-pre-wrap break-words font-spectral text-xs leading-relaxed text-grey-moss-900">
        {text || data.description || data.name || "Text Moment"}
      </p>
    </div>
  );
};

export default TextMomentPreview;
