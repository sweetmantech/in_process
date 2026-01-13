"use client";

import useAirdropRecipients from "@/hooks/useAirdropRecipients";
import { createContext, useMemo, useContext } from "react";

interface AirdropRecipientsContextValue extends ReturnType<typeof useAirdropRecipients> {}

const AirdropRecipientsContext = createContext<AirdropRecipientsContextValue | null>(null);

const AirdropRecipientsProvider = ({ children }: { children: React.ReactNode }) => {
  const recipientsData = useAirdropRecipients();

  const value = useMemo(
    () => ({
      ...recipientsData,
    }),
    [recipientsData]
  );

  return (
    <AirdropRecipientsContext.Provider value={value}>{children}</AirdropRecipientsContext.Provider>
  );
};

export const useAirdropRecipientsProvider = () => {
  const context = useContext(AirdropRecipientsContext);
  if (!context) {
    throw new Error("useAirdropRecipientsProvider must be used within a AirdropRecipientsProvider");
  }
  return context;
};

export default AirdropRecipientsProvider;
