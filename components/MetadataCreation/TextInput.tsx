import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent, UIEvent, useState, useEffect } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { fileUploading, write, writingText, creating, createdContract } =
    useZoraCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const handleScroll = (e: UIEvent<HTMLTextAreaElement | HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const position: ScrollPosition =
      scrollTop === 0
        ? "top"
        : scrollHeight - scrollTop - clientHeight <= 5
        ? "bottom"
        : "mid";
    setScrollPosition(position);
  };

  useEffect(() => {
    if (createdContract) {
      setScrollPosition("top");
    }
  }, [createdContract]);

  if (createdContract) {
    return (
      <div className="size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white disabled:cursor-not-allowed relative">
        <div
          className="relative z-[2] size-full p-2 md:p-4 pt-24 pb-24 bg-grey-eggshell overflow-y-auto whitespace-pre-wrap break-words"
          onScroll={handleScroll}
        >
          {writingText}
        </div>
        {scrollPosition && (
          <>
            {scrollPosition !== "top" && (
              <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
            )}
            {scrollPosition !== "bottom" && (
              <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-grey-eggshell !resize-none"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          write(e.target.value);
        }}
        onScroll={handleScroll}
      />
      {scrollPosition && (
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
