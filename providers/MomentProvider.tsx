import { createContext, useContext, ReactNode } from "react";
import { Moment } from "@/types/moment";
import useMoment from "@/hooks/useMoment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MomentContext = createContext<
  | (ReturnType<typeof useMoment> & {
      moment: Moment;
    })
  | undefined
>(undefined);

export function MomentProvider({ children, moment }: { children: ReactNode; moment: Moment }) {
  const momentData = useMoment(moment);

  return (
    <MomentContext.Provider
      value={{
        moment,
        ...momentData,
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
