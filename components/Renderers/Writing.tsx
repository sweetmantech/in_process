import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useMeasure } from "react-use";
import { cn } from "@/lib/utils";

interface WritingProps {
  fileUrl: string;
  description: string;
}
const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [writingRef, { height: contentHeight }] = useMeasure();
  const [containerRef, { height: containerHeight }] = useMeasure();

  useEffect(() => {
    const getText = async () => {
      const response = await fetch(fileUrl);
      const content = await response.text();
      setText(content || description);
      setIsLoading(false);
    };
    if (fileUrl) getText();
  }, [description, fileUrl]);

  if (isLoading) return <Skeleton className="min-h-[200px] size-full" />;
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
          __html: text.replaceAll("\n", "<br/>"),
        }}
        ref={writingRef as any}
      />
      {isOverflowed && (
        <div className="h-1/2 absolute size-full left-0 bottom-0 bg-gradientBottomTop" />
      )}
    </div>
  );
};

export default Writing;
