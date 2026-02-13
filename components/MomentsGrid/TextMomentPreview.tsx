"use client";

import { useEffect, useState } from "react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";

interface TextMomentPreviewProps {
  data: TokenMetadataJson;
}

const TextMomentPreview = ({ data }: TextMomentPreviewProps) => {
  const [text, setText] = useState<string>("");
  const contentUrl = getFetchableUrl(data.content?.uri) || getFetchableUrl(data.animation_url);

  useEffect(() => {
    let mounted = true;
    const ac = new AbortController();
    const fetchText = async () => {
      try {
        if (!contentUrl) {
          setText(data.description || data.name || "");
          return;
        }
        const response = await fetch(contentUrl, { signal: ac.signal });
        if (!response.ok) throw new Error();
        const content = await response.text();
        if (mounted) setText(content || data.description || "");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (mounted) setText(data.description || data.name || "");
      }
    };
    void fetchText();
    return () => {
      mounted = false;
      ac.abort();
    };
  }, [contentUrl, data.description, data.name]);

  return (
    <div className="absolute inset-0 z-[1] flex items-start overflow-hidden bg-grey-eggshell p-4 pt-6 transition-transform duration-300 group-hover:scale-[1.02]">
      <p className="line-clamp-[8] whitespace-pre-wrap break-words font-spectral text-xs leading-relaxed text-grey-moss-900">
        {text || data.description || data.name || "Text Moment"}
      </p>
    </div>
  );
};

export default TextMomentPreview;
