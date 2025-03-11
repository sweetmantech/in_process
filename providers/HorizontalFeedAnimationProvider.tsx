import { createContext, useContext, ReactNode, useMemo } from "react";
import { useHorizontalFeedAnimation } from "@/hooks/useHorizontalFeedAnimation";

const HorizontalFeedAnimationContext = createContext<ReturnType<
  typeof useHorizontalFeedAnimation
> | null>(null);

export function HorizontalFeedAnimationProvider({
  children,
  totalFeeds,
}: {
  children: ReactNode;
  totalFeeds: number;
}) {
  const horizontalFeedAnimation = useHorizontalFeedAnimation(totalFeeds);

  const value = useMemo(
    () => ({
      ...horizontalFeedAnimation,
    }),
    [horizontalFeedAnimation],
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
      "useHorizontalFeedAnimationProvider must be used within a HorizontalFeedAnimationProvider",
    );
  }
  return context;
}
