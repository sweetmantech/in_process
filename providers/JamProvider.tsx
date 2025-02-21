import useJam from "@/hooks/jam/useJam";
import { createContext, useMemo, useContext } from "react";

const JamContext = createContext<ReturnType<typeof useJam>>(
  {} as ReturnType<typeof useJam>,
);

const JamProvider = ({ children }: { children: React.ReactNode }) => {
  const jam = useJam();

  const value = useMemo(
    () => ({
      ...jam,
    }),
    [jam],
  );

  return <JamContext.Provider value={value}>{children}</JamContext.Provider>;
};

export const useJamProvider = () => {
  const context = useContext(JamContext);
  if (!context) {
    throw new Error("useJamProvider must be used within a JamProvider");
  }
  return context;
};

export default JamProvider;
