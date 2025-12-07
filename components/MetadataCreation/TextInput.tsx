import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { ChangeEvent, useState } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { writingText, setWritingText } = useMomentFormProvider();
  const { creating } = useMomentCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLTextAreaElement;
    const position: ScrollPosition =
      scrollTop === 0 ? "top" : scrollHeight - scrollTop - clientHeight <= 5 ? "bottom" : "mid";
    setScrollPosition(position);
  };

  return (
    <div className="relative size-full overflow-hidden border border-grey-moss-300 bg-white !font-spectral shadow-[5px_6px_2px_2px_#0000000f] disabled:cursor-not-allowed">
      <textarea
        className="relative z-[2] size-full !resize-none bg-grey-eggshell p-2 !outline-none md:p-4"
        value={writingText}
        disabled={Boolean(creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setWritingText(e.target.value);
        }}
        onScroll={handleScroll}
      />
      {scrollPosition && (
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute left-0 top-0 z-[3] h-24 w-full bg-gradientTopBottom" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute bottom-0 left-0 z-[3] h-24 w-full bg-gradientBottomTop" />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
