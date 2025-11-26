"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTimelineApi } from "@/hooks/useTimelineApi";
import { TimelineMoment, TimelineResponse } from "@/lib/timeline/fetchTimeline";

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

interface TimelineApiProviderProps {
  children: ReactNode;
  artistAddress?: string;
  includeHidden?: boolean;
  type?: "mutual" | "artist" | "timeline";
}

export const TimelineApiProvider = ({
  children,
  artistAddress,
  includeHidden = false,
  type = "timeline",
}: TimelineApiProviderProps) => {
  const { data, isLoading, error, currentPage, setCurrentPage, fetchMore } = useTimelineApi(
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

export const useTimelineApiContext = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimelineApiContext must be used within TimelineApiProvider");
  return ctx;
};
