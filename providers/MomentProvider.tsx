import useTokenInfo from "@/hooks/useTokenInfo";
import { Moment } from "@/types/moment";
import { createContext, useContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MomentContext = createContext<
  | (ReturnType<typeof useTokenInfo> & {
      moment: Moment;
    })
  | undefined
>(undefined);

export function MomentProvider({ children, moment }: { children: ReactNode; moment: Moment }) {
  const momentdata = useTokenInfo(moment);

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
