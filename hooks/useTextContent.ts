"use client";

import { useEffect, useState } from "react";
import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import useArweaveUrl from "./useArweaveUrl";

const useTextContent = (data: TokenMetadataJson) => {
  const [text, setText] = useState<string>("");
  const rawUri = data.content?.uri || data.animation_url || "";
  const { url: contentUrl, isLoading: urlLoading } = useArweaveUrl(rawUri);

  useEffect(() => {
    if (urlLoading) return;
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
  }, [contentUrl, urlLoading, data.description, data.name]);

  return text;
};

export default useTextContent;
