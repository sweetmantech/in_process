import useLayout from "@/hooks/useLayout";
import { createContext, useMemo, useContext } from "react";

const LayoutContext = createContext<ReturnType<typeof useLayout>>(
  {} as ReturnType<typeof useLayout>,
);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const layout = useLayout();

  const value = useMemo(
    () => ({
      ...layout,
    }),
    [layout],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutProvider = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutProvider must be used within a LayoutProvider");
  }
  return context;
};

export default LayoutProvider;
