import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useWritingScrollbar } from "@/hooks/useWritingScrollbar";

interface WritingProps {
  fileUrl: string;
  description: string;
}

const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { scrollPosition, canScroll, scrollerRef, handleScroll, updateScrollState } = useWritingScrollbar();

  useEffect(() => {
    let mounted = true;
    const ac = new AbortController();
    const getText = async () => {
      try {
        if (!fileUrl) {
          setText(description);
          return;
        }
        setIsLoading(true);
        const response = await fetch(fileUrl, { signal: ac.signal });
        if (!response.ok) throw new Error(`Failed to fetch writing: ${response.status}`);
        const content = await response.text();
        if (!mounted) return;
        setText(content || description);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (mounted) setText(description);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    void getText();
    return () => {
      mounted = false;
      ac.abort();
    };
  }, [description, fileUrl]);

  // Update scroll state when text or loading changes
  useEffect(() => {
    updateScrollState();
  }, [text, isLoading, updateScrollState]);

  if (isLoading && !text) return <Skeleton className="min-h-[200px] size-full" />;

  return (
    <div className="size-full !font-spectral shadow-[5px_6px_2px_2px_#0000000f] border border-grey-moss-300 bg-white relative">
      <div
        className="relative z-[2] size-full p-2 md:p-4 pt-24 bg-grey-eggshell overflow-y-auto whitespace-pre-wrap break-words text-sm md:text-base"
        onScroll={handleScroll}
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Writing content"
      >
        {text}
      </div>
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
