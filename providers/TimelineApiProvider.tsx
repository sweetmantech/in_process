"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useTimelineApi, TimelineMoment, TimelineResponse } from "@/hooks/useTimelineApi";

interface TimelineContextValue {
  data: TimelineResponse | undefined;
  moments: TimelineMoment[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined);

export const TimelineApiProvider = ({
  children,
  artistAddress,
  includeHidden = false,
}: {
  children: ReactNode;
  artistAddress?: string;
  includeHidden?: boolean;
}) => {
  const { data, isLoading, error, currentPage, setCurrentPage } = useTimelineApi(
    1,
    100,
    true,
    artistAddress,
    includeHidden
  );
  const [allMoments, setAllMoments] = useState<TimelineMoment[]>([]);

  // Whenever data changes, merge new moments into allMoments (avoid duplicates)
  useEffect(() => {
    if (data?.moments?.length) {
      setAllMoments((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMoments = data.moments.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newMoments];
      });
    }
  }, [data]);

  return (
    <TimelineContext.Provider
      value={{
        data,
        moments: allMoments,
        isLoading,
        error,
        currentPage,
        setCurrentPage,
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
