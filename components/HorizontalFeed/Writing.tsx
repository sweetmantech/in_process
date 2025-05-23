import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useMeasure } from "react-use";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

const DESKTOP_OVERFLOW_THRESHOLD = 206;
const MOBILE_OVERFLOW_THRESHOLD = 138;

interface WritingProps {
  fileUrl: string;
  description: string;
}
const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [writingRef, { height }] = useMeasure();
  const isMobile = useIsMobile();

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
  const isOverflowed =
    height >
    (isMobile ? MOBILE_OVERFLOW_THRESHOLD : DESKTOP_OVERFLOW_THRESHOLD);
  const shouldCenter = height < DESKTOP_OVERFLOW_THRESHOLD;
  const isShortText = height < DESKTOP_OVERFLOW_THRESHOLD / 2;

  return (
    <div
      className={cn(
        "size-full relative bg-grey-eggshell text-sm md:text-md",
        shouldCenter && "flex items-center justify-center",
        isShortText && "text-xl md:text-3xl",
      )}
    >
      <div
        className={cn(
          "bg-grey-eggshell p-2 !normal-case text-left",
          !Boolean(height) && "opacity-0",
        )}
        dangerouslySetInnerHTML={{
          __html: text.replaceAll("\n", "<br/>"),
        }}
        ref={writingRef as any}
      />
      {isOverflowed && (
        <div className="absolute size-full left-0 top-0 bg-gradientBottomTop" />
      )}
    </div>
  );
};

export default Writing;
