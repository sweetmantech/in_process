import { useEffect, useRef, useState } from "react";

const useCheckTimelineOverflow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineOverflowed, setTimelineOverflowed] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const timeline = timelineRef.current;

    if (!container || !timeline) return;

    const observer = new ResizeObserver(() => {
      if (container.offsetWidth > timeline.offsetWidth) {
        setTimelineOverflowed(false);
      } else {
        setTimelineOverflowed(true);
      }
    });
    observer.observe(container);
    observer.observe(timeline);
    return () => {
      observer.disconnect();
    };
  }, [containerRef, timelineRef]);

  return {
    timelineOverflowed,
    containerRef,
    timelineRef,
  };
};

export default useCheckTimelineOverflow;
