import { useCollectors } from "@/hooks/useCollectors";
import { createContext, useContext, ReactNode } from "react";

const MomentCollectorsContext = createContext<ReturnType<typeof useCollectors> | undefined>(
  undefined
);

export function MomentCollectorsProvider({ children }: { children: ReactNode }) {
  const collectors = useCollectors();

  return (
    <MomentCollectorsContext.Provider value={collectors}>
      {children}
    </MomentCollectorsContext.Provider>
  );
}

export function useMomentCollectorsProvider() {
  const context = useContext(MomentCollectorsContext);
  if (context === undefined) {
    throw new Error("useMomentCollectorsProvider must be used within a MomentCollectorsProvider");
  }
  return context;
}
