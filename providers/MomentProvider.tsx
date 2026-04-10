"use client";

import { Moment } from "@/types/moment";
import { createContext, useContext, ReactNode } from "react";
import useMomentData from "@/hooks/useMomentData";
import useMomentSocket from "@/hooks/useMomentSocket";

const MomentContext = createContext<
  | (ReturnType<typeof useMomentData> & {
      moment: Moment;
    })
  | undefined
>(undefined);

export function MomentProvider({ children, moment }: { children: ReactNode; moment: Moment }) {
  const momentdata = useMomentData(moment);
  useMomentSocket(moment, momentdata.fetchMomentData);

  return (
    <MomentContext.Provider
      value={{
        moment,
        ...momentdata,
      }}
    >
      {children}
    </MomentContext.Provider>
  );
}

export function useMomentProvider() {
  const context = useContext(MomentContext);
  if (context === undefined) {
    throw new Error("useMomentProvider must be used within a MomentProvider");
  }
  return context;
}
