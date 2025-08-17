import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface WritingProps {
  fileUrl: string;
  description: string;
}

const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<"top" | "mid" | "bottom">("top");
  const [canScroll, setCanScroll] = useState<boolean>(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

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
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    const position =
      scrollTop === 0
        ? "top"
        : scrollHeight - scrollTop - clientHeight <= 5
        ? "bottom"
        : "mid";
    setScrollPosition(position);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const can = el.scrollHeight > el.clientHeight;
    setCanScroll(can);
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 5;
    const next: "top" | "mid" | "bottom" = !can
      ? "top"
      : el.scrollTop === 0
        ? "top"
        : nearBottom
          ? "bottom"
          : "mid";
    setScrollPosition((prev) => (prev === next ? prev : next));
  }, [text, isLoading]);

  if (isLoading) return <Skeleton className="min-h-[200px] size-full" />;

  return (
    <div className="size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white relative">
      <div
        className="relative z-[2] size-full p-2 md:p-4 pt-24 bg-grey-eggshell overflow-y-auto whitespace-pre-wrap text-sm md:text-base"
        onScroll={handleScroll}
        ref={scrollerRef}
        dangerouslySetInnerHTML={{
          __html: text.replaceAll("\n", "<br/>"),
        }}
      />
      {canScroll && scrollPosition !== "top" && (
        <div aria-hidden="true" className="pointer-events-none absolute z-[3] left-0 top-0 bg-gradientTopBottom w-full h-24" />
      )}
      {canScroll && scrollPosition !== "bottom" && (
        <div aria-hidden="true" className="pointer-events-none absolute z-[3] left-0 bottom-0 bg-gradientBottomTop w-full h-24" />
      )}
    </div>
  );
};

export default Writing;
