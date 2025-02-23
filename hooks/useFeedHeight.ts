import { useState, useCallback } from "react";

interface UseFeedHeightReturn {
  nearestIndex: number | null;
  neighborIndexes: number[];
  handleMouseMove: (e: React.MouseEvent) => void;
  getHeight: (index: number) => number;
  isHovered: (index: number) => boolean;
}

export const useFeedHeight = (totalFeeds: number): UseFeedHeightReturn => {
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);
  const [neighborIndexes, setNeighborIndexes] = useState<number[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const findNearestButtonIndex = useCallback((mouseX: number) => {
    const buttons = document.querySelectorAll("button[data-feed-button]");
    let nearest = { index: 0, distance: Infinity };

    buttons.forEach((button, idx) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - buttonCenterX);

      if (distance < nearest.distance) {
        nearest = { index: idx, distance };
      }
    });

    return nearest;
  }, []);

  const getNeighborIndexes = useCallback(
    (centerIndex: number) => {
      const neighbors: number[] = [];
      // Get 4 indexes to the left
      for (let i = 1; i <= 4; i++) {
        const leftIndex = centerIndex - i;
        if (leftIndex >= 0) {
          neighbors.push(leftIndex);
        }
      }
      // Get 4 indexes to the right
      for (let i = 1; i <= 4; i++) {
        const rightIndex = centerIndex + i;
        if (rightIndex < totalFeeds) {
          neighbors.push(rightIndex);
        }
      }
      return neighbors;
    },
    [totalFeeds],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const mouseX = e.clientX;
      setMouseX(mouseX);
      const nearest = findNearestButtonIndex(mouseX);
      setNearestIndex(nearest.index);
      setNeighborIndexes(getNeighborIndexes(nearest.index));
    },
    [findNearestButtonIndex, getNeighborIndexes],
  );

  const getHeight = useCallback(
    (index: number): number => {
      if (nearestIndex === null) return 30;
      if (index === nearestIndex) return 100;

      const distance = Math.abs(index - nearestIndex);
      if (distance <= 3) {
        return 100 - 17.5 * distance;
      }
      return 30;
    },
    [nearestIndex],
  );

  const isHovered = useCallback(
    (index: number): boolean => {
      if (nearestIndex === null || mouseX === null) return false;

      // Only show hover for the nearest element
      return index === nearestIndex;
    },
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
