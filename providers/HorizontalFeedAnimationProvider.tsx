import { createContext, useContext, ReactNode } from "react";
import { useHorizontalFeedAnimation } from "@/hooks/useHorizontalFeedAnimation";

interface HorizontalFeedAnimationContextType {
  getHeight: (index: number) => number;
  isHovered: (index: number) => boolean;
  handleMouseMove: (e: React.MouseEvent) => void;
}

const HorizontalFeedAnimationContext =
  createContext<HorizontalFeedAnimationContextType | null>(null);

export function HorizontalFeedAnimationProvider({
  children,
  totalFeeds,
}: {
  children: ReactNode;
  totalFeeds: number;
}) {
  const { getHeight, isHovered, handleMouseMove } =
    useHorizontalFeedAnimation(totalFeeds);

  return (
    <HorizontalFeedAnimationContext.Provider
      value={{ getHeight, isHovered, handleMouseMove }}
    >
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
