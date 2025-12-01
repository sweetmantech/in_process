"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTimeline } from "@/hooks/useTimeline";
import { TimelineMoment } from "@/types/moment";
import { TimelineResponse } from "@/lib/timeline/fetchTimeline";

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
  includeHidden?: boolean;
  type?: "mutual" | "default";
}

export const TimelineProvider = ({
  children,
  artistAddress,
  includeHidden = false,
  type,
}: TimelineProviderProps) => {
  const { data, isLoading, error, currentPage, setCurrentPage, fetchMore } = useTimeline(
    1,
    100,
    true,
    artistAddress,
    includeHidden,
    type
  );

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
