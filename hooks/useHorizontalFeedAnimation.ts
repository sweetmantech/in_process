import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import useIsMobile from "./useIsMobile";
import { Swiper } from "swiper/types";
import useCheckTimelineOverflow from "./useCheckTimelineOverflow";

interface UseHorizontalFeedAnimationReturn {
  nearestIndex: number | null;
  neighborIndexes: number[];
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
  totalFeeds: number,
): UseHorizontalFeedAnimationReturn => {
  const isMobile = useIsMobile();

  const NEIGHBOR_RANGE = isMobile ? 0 : 5;
  const MAX_HEIGHT = isMobile ? 80 : 200;
  const MIN_HEIGHT = isMobile ? 0 : 60;
  const HEIGHT_DECREMENT = 28;

  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [nearestIndex, setNearestIndex] = useState<number | null>(0);
  const [neighborIndexes, setNeighborIndexes] = useState<number[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [eventTriggered, setEventTriggered] = useState<boolean>(false);
  const [feedEnded, setFeedEnded] = useState<boolean>(false);

  const checkTimelineOverflow = useCheckTimelineOverflow();

  const getNeighborIndexes = useCallback(
    (centerIndex: number) => {
      if (centerIndex < 0) return [];
      const neighbors = new Set<number>();
      const start = Math.max(0, centerIndex - NEIGHBOR_RANGE);
      const end = Math.min(totalFeeds - 1, centerIndex + NEIGHBOR_RANGE);
      for (let i = start; i <= end; i++) {
        if (i !== centerIndex) {
          neighbors.add(i);
        }
      }
      return Array.from(neighbors);
    },
    [totalFeeds],
  );

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
      const currentMouseX = e.clientX;
      if (currentMouseX === null) {
        setNearestIndex(null);
        setNeighborIndexes([]);
        setMouseX(null);
        return;
      }
      setEventTriggered(true);
      setMouseX(currentMouseX);
      const nearest = findNearestButtonIndex(currentMouseX);
      if (nearest.index !== nearestIndex) {
        setNearestIndex(nearest.index);
        setNeighborIndexes(getNeighborIndexes(nearest.index));
      }
    },
    [findNearestButtonIndex, getNeighborIndexes, nearestIndex],
  );

  const getHeight = useCallback(
    (index: number): number => {
      if (isMobile) return activeIndex === index ? MAX_HEIGHT : MIN_HEIGHT;

      if (nearestIndex === null) return MIN_HEIGHT;
      if (index === nearestIndex) return MAX_HEIGHT;

      const distance = Math.abs(index - nearestIndex);
      if (distance <= NEIGHBOR_RANGE) {
        return Math.max(MIN_HEIGHT, MAX_HEIGHT - HEIGHT_DECREMENT * distance);
      }
      return MIN_HEIGHT;
    },
    [nearestIndex, isMobile, activeIndex],
  );

  const isHovered = useCallback(
    (index: number): boolean => {
      if (isMobile) return activeIndex === index;
      if (
        mouseX === null &&
        nearestIndex === 0 &&
        !eventTriggered &&
        index === 0
      )
        return true;
      return nearestIndex !== null && mouseX !== null && index === nearestIndex;
    },
    [nearestIndex, mouseX, activeIndex, isMobile],
  );

  return {
    nearestIndex,
    neighborIndexes,
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
