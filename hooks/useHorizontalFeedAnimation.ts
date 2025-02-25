import { useState, useCallback } from "react";

const NEIGHBOR_RANGE = 5;
const MAX_HEIGHT = 200;
const MIN_HEIGHT = 60;
const HEIGHT_DECREMENT = 28;

interface UseHorizontalFeedAnimationReturn {
  nearestIndex: number | null;
  neighborIndexes: number[];
  handleMouseMove: (e: React.MouseEvent) => void;
  getHeight: (index: number) => number;
  isHovered: (index: number) => boolean;
}

interface NearestButton {
  index: number;
  distance: number;
}

export const useHorizontalFeedAnimation = (
  totalFeeds: number,
): UseHorizontalFeedAnimationReturn => {
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);
  const [neighborIndexes, setNeighborIndexes] = useState<number[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);

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
      if (nearestIndex === null) return MIN_HEIGHT;
      if (index === nearestIndex) return MAX_HEIGHT;

      const distance = Math.abs(index - nearestIndex);
      if (distance <= NEIGHBOR_RANGE) {
        return Math.max(MIN_HEIGHT, MAX_HEIGHT - HEIGHT_DECREMENT * distance);
      }
      return MIN_HEIGHT;
    },
    [nearestIndex],
  );

  const isHovered = useCallback(
    (index: number): boolean =>
      nearestIndex !== null && mouseX !== null && index === nearestIndex,
    [nearestIndex, mouseX],
  );

  return {
    nearestIndex,
    neighborIndexes,
    handleMouseMove,
    getHeight,
    isHovered,
  };
};
