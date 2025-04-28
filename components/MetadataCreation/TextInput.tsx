import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ChangeEvent, useState } from "react";

const TextInput = () => {
  const { writingRef, fileUploading, write, writingText, creating } =
    useZoraCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<
    "top" | "mid" | "bottom" | null
  >(null);
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    if (scrollTop === 0) {
      setScrollPosition("top");
      return;
    }
    if (scrollHeight - scrollTop - clientHeight <= 5) {
      setScrollPosition("bottom");
      return;
    }
    setScrollPosition("mid");
  };

  return (
    <div className="overflow-hidden size-full !font-spectral shadow-lg bg-white disabled:cursor-not-allowed relative">
      <textarea
        className="relative z-[2] size-full !outline-none p-2 md:p-4 bg-grey-moss-100"
        value={writingText}
        disabled={Boolean(fileUploading || creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          write(e.target.value);
        }}
        onScroll={handleScroll}
      />
      {scrollPosition !== "top" && scrollPosition && (
        <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-20" />
      )}
      {scrollPosition !== "bottom" && scrollPosition && (
        <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-20" />
      )}
      <div
        className="z-[1] p-2 md:p-4 absolute min-h-full left-0 top-0 bg-grey-moss-100 border border-grey-moss-100 flex items-center"
        ref={writingRef}
      >
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
        />
      </div>
    </div>
  );
};

export default TextInput;
