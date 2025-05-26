import { useMeasure } from "react-use";
import { cn } from "@/lib/utils";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const WritingPreview = () => {
  const [writingRef, { height: contentHeight }] = useMeasure();
  const [containerRef, { height: containerHeight }] = useMeasure();
  const { writingText } = useZoraCreateProvider();

  const isOverflowed = contentHeight > containerHeight;
  const shouldCenter = contentHeight < containerHeight;
  const isShortText = contentHeight < containerHeight / 2;

  return (
    <div
      className={cn(
        "size-full relative bg-grey-eggshell text-sm md:text-md",
        shouldCenter && "flex items-center justify-center",
        isShortText && "text-xl md:text-3xl",
      )}
      ref={containerRef as any}
    >
      <div
        className={cn(
          "bg-grey-eggshell p-2 !normal-case text-left",
          !Boolean(containerHeight) && "opacity-0",
        )}
        dangerouslySetInnerHTML={{
          __html: writingText.replaceAll("\n", "<br/>"),
        }}
      />
      <div className="size-full left-0 top-0 absolute pointer-events-none opacity-0">
        <div
          className={cn(
            "!text-sm md:!text-md bg-grey-eggshell p-2 !normal-case text-left",
          )}
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
          ref={writingRef as any}
        />
      </div>
      {isOverflowed && (
        <div className="h-1/2 absolute size-full left-0 bottom-0 bg-gradientBottomTop" />
      )}
    </div>
  );
};

export default WritingPreview;
