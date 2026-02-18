import { useState, useCallback, useRef } from "react";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const STEP = 5;

export const useVisibleMoments = () => {
  const { moments } = useTimelineProvider();
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleMoments = moments.slice(0, visibleCount);
  const hasMore = visibleCount < moments.length;

  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const showMore = useCallback(() => {
    if (hasMoreRef.current) setVisibleCount((prev) => prev + STEP);
  }, []);

  return { visibleMoments, hasMore, showMore };
};
