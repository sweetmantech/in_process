import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useState, useEffect } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { fileUploading, write, writingText, creating } = useZoraCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    const position: ScrollPosition =
      scrollTop === 0
        ? "top"
        : scrollHeight - scrollTop - clientHeight <= 5
        ? "bottom"
        : "mid";
    setScrollPosition(position);
  };

  useEffect(() => {
    // initialize scroll position on mount
    setScrollPosition("top");
  }, []);

  return (
    <div className="w-full min-h-[300px] md:min-h-auto md:aspect-[571/692] relative bg-contain">
      <div className="size-full">
        <div className="size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white disabled:cursor-not-allowed relative">
          <div
            className="relative z-[2] size-full p-2 md:p-4 pt-24 bg-grey-eggshell overflow-y-auto whitespace-pre-wrap"
            contentEditable={!fileUploading && !creating}
            suppressContentEditableWarning
            onInput={(e) => write((e.target as HTMLDivElement).innerText)}
            onScroll={handleScroll}
          >
            {writingText}
          </div>

          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
