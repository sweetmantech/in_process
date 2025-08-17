import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect,
} from "react";
import useIsMobile from "./useIsMobile";
import { Swiper } from "swiper/types";
import useCheckTimelineOverflow from "./useCheckTimelineOverflow";
import { Token } from "@/types/token";
import useTimelineCenter from "./useTimelineCenter";

interface UseHorizontalFeedAnimationReturn {
  nearestIndex: number | null;
  handleMouseMove: (e: React.MouseEvent) => void;
  getHeight: (index: number) => number;
  isHovered: (index: number) => boolean;
  activeIndex: number;
  feedEnded: boolean;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setEventTriggered: Dispatch<SetStateAction<boolean>>;
  setFeedEnded: Dispatch<SetStateAction<boolean>>;
  swiper: Swiper | null;
  setSwiper: Dispatch<SetStateAction<Swiper | null>>;
  timelineOverflowed: boolean;
  containerRef: RefObject<HTMLDivElement>;
  timelineRef: RefObject<HTMLDivElement>;
}

interface NearestButton {
  index: number;
  distance: number;
}

export const useHorizontalFeedAnimation = (
  feeds: Token[],
): UseHorizontalFeedAnimationReturn => {
  const isMobile = useIsMobile();

  const NEIGHBOR_RANGE = isMobile ? 0 : 3;
  const MAX_HEIGHT = isMobile ? 80 : 180;
  const MIN_HEIGHT = isMobile ? 0 : 60;
  const HEIGHT_DECREMENT = 40;

  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [eventTriggered, setEventTriggered] = useState<boolean>(false);
  const [feedEnded, setFeedEnded] = useState<boolean>(false);
  const [isAnyVideoFullscreen, setIsAnyVideoFullscreen] = useState<boolean>(false);
  const checkTimelineOverflow = useCheckTimelineOverflow();
  const centerIndex = useTimelineCenter({ activeIndex, swiper, feeds });

  // Enhanced fullscreen detection
  useEffect(() => {
    const checkFullscreen = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsAnyVideoFullscreen(isFullscreen);
      
      // If entering fullscreen, reset hover states
      if (isFullscreen) {
        setNearestIndex(null);
        setEventTriggered(false);
      }
    };

    // Check immediately
    checkFullscreen();

    // Listen for all possible fullscreen events
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('MSFullscreenChange', checkFullscreen);
    };
  }, []);

  const findNearestButtonIndex = useCallback(
    (currentMouseX: number): NearestButton => {
      const buttons = document.querySelectorAll<HTMLButtonElement>(
        "button[data-feed-button]",
      );
      return Array.from(buttons).reduce(
        (nearest, button, idx) => {
          const rect = button.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(currentMouseX - buttonCenterX);

          return distance < nearest.distance
            ? { index: idx, distance }
            : nearest;
        },
        { index: -1, distance: Infinity },
      );
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // AGGRESSIVE: Block ALL hover logic if any video is fullscreen
      if (isAnyVideoFullscreen) {
        return;
      }

      const currentMouseX = e.clientX;
      if (currentMouseX === null) {
        setNearestIndex(null);
        return;
      }

      // Additional check for direct fullscreen elements
      if (
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      ) {
        return;
      }

      const target = e.target as Element;
      if (target && (target.closest('[data-video-hover-area]') || target.closest('video') || target.tagName === 'VIDEO')) {
        return;
      }

      setEventTriggered(true);
      const nearest = findNearestButtonIndex(currentMouseX);
      if (nearest.index !== nearestIndex) {
        setNearestIndex(nearest.index);
      }
    },
    [findNearestButtonIndex, nearestIndex, isAnyVideoFullscreen]
  );

  const getHeight = useCallback(
    (index: number): number => {
      // Block height changes when fullscreen
      if (isAnyVideoFullscreen) {
        return MIN_HEIGHT;
      }

      if (isMobile) {
        return (!activeIndex && !index) || activeIndex - 1 === index
          ? MAX_HEIGHT
          : MIN_HEIGHT;
      }

      if (centerIndex === null || nearestIndex === null) return MIN_HEIGHT;
      if (index === centerIndex - 1) return MAX_HEIGHT;

      const distance = Math.abs(index - centerIndex);
      if (distance <= NEIGHBOR_RANGE) {
        return Math.max(MIN_HEIGHT, MAX_HEIGHT - HEIGHT_DECREMENT * distance);
      }
      return MIN_HEIGHT;
    },
    [centerIndex, isMobile, activeIndex, nearestIndex, isAnyVideoFullscreen, MAX_HEIGHT, MIN_HEIGHT, NEIGHBOR_RANGE, HEIGHT_DECREMENT],
  );

  const isHovered = useCallback(
    (index: number): boolean => {
      // Block hover states when fullscreen
      if (isAnyVideoFullscreen) {
        return false;
      }

      if (isMobile)
        return (!activeIndex && !index) || activeIndex - 1 === index;
      if (nearestIndex === 0 && !eventTriggered && index === 0) return true;
      return nearestIndex !== null && index === nearestIndex;
    },
    [nearestIndex, activeIndex, isMobile, eventTriggered, isAnyVideoFullscreen],
  );

  return {
    nearestIndex,
    handleMouseMove,
    getHeight,
    isHovered,
    activeIndex,
    setActiveIndex,
    setEventTriggered,
    setFeedEnded,
    feedEnded,
    swiper,
    setSwiper,
    ...checkTimelineOverflow,
  };
};
