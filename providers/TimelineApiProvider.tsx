"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useTimelineApi,
  TimelineMoment,
  TimelineResponse,
} from "@/hooks/useTimelineApi";
import { Address } from "viem";

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
  address,
  chainId,
}: {
  children: ReactNode;
  artistAddress?: Address;
  address?: Address;
  chainId?: string;
}) => {
  const { data, isLoading, error, currentPage, setCurrentPage } =
    useTimelineApi({
      page: 1,
      limit: 100,
      enabled: true,
      artistAddress,
      address,
      chainId,
    });
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
