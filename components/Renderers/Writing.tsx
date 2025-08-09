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
  const [scrollPosition, setScrollPosition] = useState<"top" | "mid" | "bottom">("top");
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop === 0) {
      setScrollPosition("top");
    } else if (scrollHeight - scrollTop - clientHeight <= 5) {
      setScrollPosition("bottom");
    } else {
      setScrollPosition("mid");
    }
  };

  if (isLoading) return <Skeleton className="min-h-[200px] size-full" />;
  
  const isOverflowed = contentHeight > containerHeight;
  const shouldCenter = contentHeight < containerHeight;
  const isShortText = contentHeight < containerHeight / 2;

  return (
    <div
      className={cn(
        "size-full relative bg-grey-eggshell text-sm md:text-md",
        isOverflowed ? "overflow-y-auto" : shouldCenter && "flex items-center justify-center",
        isShortText && "text-xl md:text-3xl"
      )}
      ref={containerRef as any}
      onScroll={handleScroll}
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
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-12" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-12" />
          )}
        </>
      )}
    </div>
  );
};

export default Writing;
