import { useEffect, useRef, useState } from "react";
import type { UIEvent } from "react";
import { Skeleton } from "../ui/skeleton";

type ScrollPos = "top" | "mid" | "bottom";
const SCROLL_EPS = 5;

interface WritingProps {
  fileUrl: string;
  description: string;
}

const Writing = ({ fileUrl, description }: WritingProps) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<ScrollPos>("top");
  const [canScroll, setCanScroll] = useState<boolean>(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const nearBottom = scrollHeight - scrollTop - clientHeight <= SCROLL_EPS;
    const next: ScrollPos =
      scrollTop === 0 ? "top" : nearBottom ? "bottom" : "mid";
    setScrollPosition((prev) => (prev === next ? prev : next));
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const can = el.scrollHeight > el.clientHeight;
    setCanScroll(can);
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_EPS;
    const next: ScrollPos = !can
      ? "top"
      : el.scrollTop === 0
        ? "top"
        : nearBottom
          ? "bottom"
          : "mid";
    setScrollPosition((prev) => (prev === next ? prev : next));
  }, [text, isLoading]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const can = el.scrollHeight > el.clientHeight;
      setCanScroll(can);
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_EPS;
      const next: ScrollPos = !can
        ? "top"
        : el.scrollTop === 0
          ? "top"
          : nearBottom
            ? "bottom"
            : "mid";
      setScrollPosition((prev) => (prev === next ? prev : next));
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);
    // Run once to sync immediately
    update();

    return () => ro.disconnect();
  }, []);

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
