"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useTimelineApi,
  TimelineMoment,
  TimelineResponse,
} from "@/hooks/useTimelineApi";

interface TimelineContextValue {
  data: TimelineResponse | undefined;
  moments: TimelineMoment[];
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TimelineContext = createContext<TimelineContextValue | undefined>(
  undefined
);

export const TimelineApiProvider = ({
  children,
  artistAddress,
}: {
  children: ReactNode;
  artistAddress?: string;
}) => {
  const { data, isLoading, error, currentPage, setCurrentPage } =
    useTimelineApi(1, 100, true, artistAddress);
  return (
    <TimelineContext.Provider
      value={{
        data,
        moments: data?.moments || [],
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
  if (!ctx)
    throw new Error(
      "useTimelineApiContext must be used within TimelineApiProvider"
    );
  return ctx;
};
