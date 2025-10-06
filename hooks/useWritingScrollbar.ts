import { useEffect, useRef, useState } from "react";
import type { UIEvent } from "react";

type ScrollPos = "top" | "mid" | "bottom";
const SCROLL_EPS = 5;

export const useWritingScrollbar = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPos>("top");
  const [canScroll, setCanScroll] = useState<boolean>(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const nearBottom = scrollHeight - scrollTop - clientHeight <= SCROLL_EPS;
    const next: ScrollPos = scrollTop === 0 ? "top" : nearBottom ? "bottom" : "mid";
    setScrollPosition((prev) => (prev === next ? prev : next));
  };

  const updateScrollState = () => {
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
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    // Run once to sync immediately
    updateScrollState();

    return () => ro.disconnect();
  }, []);

  return {
    scrollPosition,
    canScroll,
    scrollerRef,
    handleScroll,
    updateScrollState,
  };
};
