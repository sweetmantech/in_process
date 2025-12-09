import { useMeasure } from "react-use";
import { cn } from "@/lib/utils";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const WritingPreview = () => {
  const [writingRef, { height: contentHeight }] = useMeasure();
  const [containerRef, { height: containerHeight }] = useMeasure();
  const { writingText } = useMetadataFormProvider();

  const isOverflowed = contentHeight > containerHeight;
  const shouldCenter = contentHeight < containerHeight;
  const isShortText = contentHeight < containerHeight / 2;

  return (
    <div
      className={cn(
        "md:text-md relative size-full bg-grey-eggshell text-sm",
        shouldCenter && "flex items-center justify-center",
        isShortText && "text-xl md:text-3xl"
      )}
      ref={containerRef as any}
    >
      <div
        className={cn(
          "bg-grey-eggshell p-2 text-left !normal-case",
          !containerHeight && "opacity-0"
        )}
        dangerouslySetInnerHTML={{
          __html: writingText.replaceAll("\n", "<br/>"),
        }}
      />
      <div className="pointer-events-none absolute left-0 top-0 size-full opacity-0">
        <div
          className={cn("md:!text-md bg-grey-eggshell p-2 text-left !text-sm !normal-case")}
          dangerouslySetInnerHTML={{
            __html: writingText.replaceAll("\n", "<br/>"),
          }}
          ref={writingRef as any}
        />
      </div>
      {isOverflowed && (
        <div className="absolute bottom-0 left-0 size-full h-1/2 bg-gradientBottomTop" />
      )}
    </div>
  );
};

export default WritingPreview;
