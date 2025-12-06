"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTimeline } from "@/hooks/useTimeline";
import { TimelineMoment } from "@/types/moment";
import { TimelineResponse } from "@/types/timeline";

interface TimelineContextValue {
  data: TimelineResponse | undefined;
  moments: TimelineMoment[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchMore: () => void;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

interface TimelineProviderProps {
  children: ReactNode;
  artistAddress?: string;
  collectionAddress?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
}

export const TimelineProvider = ({
  children,
  artistAddress,
  collectionAddress,
  includeHidden = false,
  type,
}: TimelineProviderProps) => {
  const timeline = useTimeline({
    page: 1,
    limit: 100,
    enabled: true,
    artistAddress,
    collection: collectionAddress,
    includeHidden,
    type,
  });

  const { data, isLoading, error, currentPage, setCurrentPage, fetchMore } = timeline;
  const moments = data?.moments || [];

  return (
    <TimelineContext.Provider
      value={{
        data,
        moments,
        isLoading,
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
