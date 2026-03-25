"use client";

import { createContext, useContext, ReactNode } from "react";
import { useInfiniteTimeline } from "@/hooks/useInfiniteTimeline";
import { usePaginatedTimeline } from "@/hooks/usePaginatedTimeline";
import { TimelineMoment } from "@/types/moment";
import { TimelineResponse } from "@/types/timeline";

interface TimelineContextValue {
  data: TimelineResponse | undefined;
  moments: TimelineMoment[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  error: unknown;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchMore: () => void;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

interface TimelineProviderProps {
  children: ReactNode;
  artistAddress?: string;
  collection?: string;
  chainId?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
  limit?: number;
  paginated?: boolean;
}

export const TimelineProvider = ({
  children,
  artistAddress,
  collection,
  includeHidden = false,
  type,
  limit,
  paginated = false,
}: TimelineProviderProps) => {
  const infiniteResult = useInfiniteTimeline({
    page: 1,
    limit: limit ?? 100,
    enabled: !paginated,
    artistAddress,
    collection,
    includeHidden,
    type,
  });

  const paginatedResult = usePaginatedTimeline({
    limit: limit ?? 10,
    enabled: paginated,
    artistAddress,
    collection,
    includeHidden,
    type,
  });

  const timeline = paginated ? paginatedResult : infiniteResult;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    currentPage,
    setCurrentPage,
    fetchMore,
  } = timeline;

  const hasPrevPage = "hasPrevPage" in timeline ? (timeline.hasPrevPage ?? false) : false;
  const totalPages = "totalPages" in timeline ? (timeline.totalPages ?? 1) : 1;
  const moments = data?.moments || [];

  return (
    <TimelineContext.Provider
      value={{
        data,
        moments,
        isLoading,
        isFetchingNextPage,
        hasNextPage: hasNextPage ?? false,
        hasPrevPage,
        totalPages,
        error,
        currentPage,
        setCurrentPage,
        fetchMore,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineProvider = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimelineProvider must be used within TimelineProvider");
  return ctx;
};
