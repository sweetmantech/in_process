import { useState, useCallback, Dispatch, SetStateAction, RefObject, useEffect } from "react";
import useIsMobile from "./useIsMobile";
import useFullscreenDetection from "./useFullscreenDetection";
import { Swiper } from "swiper/types";
import useCheckTimelineOverflow from "./useCheckTimelineOverflow";
import useTimelineCenter from "./useTimelineCenter";

interface UseTimelineAnimationReturn {
  nearestIndex: number | null;
  handleMouseMove: (_e: React.MouseEvent) => void;
  getHeight: (_index: number) => number;
  isHovered: (_index: number) => boolean;
  activeIndex: number;
  momentEnded: boolean;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setEventTriggered: Dispatch<SetStateAction<boolean>>;
  setMomentEnded: Dispatch<SetStateAction<boolean>>;
  swiper: Swiper | null;
  setSwiper: Dispatch<SetStateAction<Swiper | null>>;
  timelineOverflowed: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  timelineRef: RefObject<HTMLDivElement | null>;
}

interface NearestButton {
  index: number;
  distance: number;
}

export const useTimelineAnimation = (itemsCount: number): UseTimelineAnimationReturn => {
  const isMobile = useIsMobile();
  const { isAnyVideoFullscreen } = useFullscreenDetection();

  const NEIGHBOR_RANGE = isMobile ? 0 : 3;
  const MAX_HEIGHT = isMobile ? 80 : 180;
  const MIN_HEIGHT = isMobile ? 0 : 60;
  const HEIGHT_DECREMENT = 40;

  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [eventTriggered, setEventTriggered] = useState<boolean>(false);
  const [momentEnded, setMomentEnded] = useState<boolean>(false);
  const checkTimelineOverflow = useCheckTimelineOverflow();
  const centerIndex = useTimelineCenter({ activeIndex, swiper, itemsCount });

  // Reset animation state when moments change
  useEffect(() => {
    // Reset nearest index when moments change to prevent stale references
    setNearestIndex(null);
    setEventTriggered(false);

    // Reset active index if it's beyond the new moments length
    if (activeIndex >= itemsCount) {
      setActiveIndex(Math.max(0, itemsCount - 1));
    }
  }, [itemsCount, activeIndex]);

  const findNearestButtonIndex = useCallback(
    (currentMouseX: number): NearestButton => {
      const buttons = document.querySelectorAll<HTMLButtonElement>("button[data-moment-button]");
      const buttonArray = Array.from(buttons);

      return buttonArray.reduce(
        (nearest, button) => {
          // Get the actual moments array index from the data attribute
          const momentIndex = parseInt(button.getAttribute("data-moment-index") || "-1", 10);

          // Skip if index is invalid or beyond moments length
          if (momentIndex < 0 || momentIndex >= itemsCount) return nearest;

          const rect = button.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(currentMouseX - buttonCenterX);

          return distance < nearest.distance ? { index: momentIndex, distance } : nearest;
        },
        { index: -1, distance: Infinity }
      );
    },
    [itemsCount]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Don't trigger hover state changes when any video is in fullscreen
      if (isAnyVideoFullscreen) {
        return;
      }

      const currentMouseX = e.clientX;
      if (currentMouseX === null) {
        setNearestIndex(null);
        return;
      }

      const target = e.target as Element | null;
      if (target && target.closest("[data-video-hover-area]")) {
        return;
      }

      setEventTriggered(true);
      const nearest = findNearestButtonIndex(currentMouseX);

      // Only update if we found a valid index within bounds
      if (nearest.index >= 0 && nearest.index < itemsCount && nearest.index !== nearestIndex) {
        setNearestIndex(nearest.index);
      } else if (nearest.index < 0 || nearest.index >= itemsCount) {
        // Clear nearest index if out of bounds
        setNearestIndex(null);
      }
    },
    [findNearestButtonIndex, nearestIndex, isAnyVideoFullscreen, itemsCount]
  );

  const getHeight = useCallback(
    (index: number): number => {
      // Return minimum height if index is out of bounds
      if (index < 0 || index >= itemsCount) return MIN_HEIGHT;

      if (isMobile) {
        return (!activeIndex && !index) || activeIndex - 1 === index ? MAX_HEIGHT : MIN_HEIGHT;
      }

      if (centerIndex === null || nearestIndex === null) return MIN_HEIGHT;
      if (index === centerIndex - 1) return MAX_HEIGHT;

      const distance = Math.abs(index - centerIndex);
      if (distance <= NEIGHBOR_RANGE) {
        return Math.max(MIN_HEIGHT, MAX_HEIGHT - HEIGHT_DECREMENT * distance);
      }
      return MIN_HEIGHT;
    },
    [
      centerIndex,
      isMobile,
      activeIndex,
      nearestIndex,
      MAX_HEIGHT,
      MIN_HEIGHT,
      NEIGHBOR_RANGE,
      HEIGHT_DECREMENT,
      itemsCount,
    ]
  );

  const isHovered = useCallback(
    (index: number): boolean => {
      // Return false if index is out of bounds
      if (index < 0 || index >= itemsCount) return false;

      if (isMobile) return (!activeIndex && !index) || activeIndex - 1 === index;
      if (nearestIndex === 0 && !eventTriggered && index === 0) return true;
      return nearestIndex !== null && index === nearestIndex;
    },
    [nearestIndex, activeIndex, isMobile, eventTriggered, itemsCount]
  );

  return {
    nearestIndex,
    handleMouseMove,
    getHeight,
    isHovered,
    activeIndex,
    setActiveIndex,
    setEventTriggered,
    setMomentEnded,
    momentEnded,
    swiper,
    setSwiper,
    ...checkTimelineOverflow,
  };
};
