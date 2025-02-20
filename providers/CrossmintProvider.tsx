"use client";

import useCrossmintMintComments from "@/hooks/useCrossmintMintComments";
import {
  CrossmintProvider as Crossmint,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";
import { createContext, Fragment, useContext } from "react";

const CrossmintContext = createContext<
  ReturnType<typeof useCrossmintMintComments> | undefined
>(undefined);

export function CrossmintProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CROSSMINT_API_KEY) return <Fragment />;

  const crossmintComments = useCrossmintMintComments();

  return (
    <CrossmintContext.Provider
      value={{
        ...crossmintComments,
      }}
    >
      <Crossmint apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
        <CrossmintCheckoutProvider>{children}</CrossmintCheckoutProvider>
      </Crossmint>
    </CrossmintContext.Provider>
  );
}

export function useCrossmintProvider() {
  const context = useContext(CrossmintContext);
  if (context === undefined) {
    throw new Error(
      "useCrossmintProvider must be used within a CrossmintProvider",
    );
  }
  return context;
}
