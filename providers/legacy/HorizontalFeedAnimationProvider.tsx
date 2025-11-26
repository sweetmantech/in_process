import { createContext, useContext, ReactNode, useMemo } from "react";
import { useHorizontalFeedAnimation } from "@/hooks/legacy/useHorizontalFeedAnimation";
import { TimelineMoment } from "@/lib/timeline/fetchTimeline";

const HorizontalFeedAnimationContext = createContext<ReturnType<
  typeof useHorizontalFeedAnimation
> | null>(null);

export function HorizontalFeedAnimationProvider({
  children,
  feeds,
}: {
  children: ReactNode;
  feeds: TimelineMoment[];
}) {
  const horizontalFeedAnimation = useHorizontalFeedAnimation(feeds);

  const value = useMemo(
    () => ({
      ...horizontalFeedAnimation,
    }),
    [horizontalFeedAnimation]
  );

  return (
    <HorizontalFeedAnimationContext.Provider value={value}>
      {children}
    </HorizontalFeedAnimationContext.Provider>
  );
}

export function useHorizontalFeedAnimationProvider() {
  const context = useContext(HorizontalFeedAnimationContext);
  if (!context) {
    throw new Error(
      "useHorizontalFeedAnimationProvider must be used within a HorizontalFeedAnimationProvider"
    );
  }
  return context;
}
