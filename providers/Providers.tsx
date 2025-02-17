"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import { CrossmintProvider } from "@crossmint/client-sdk-react-ui";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CrossmintProvider
      apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}
    >
      <WagmiProvider>
        <PrivyProvider>
          <ZoraCreateProvider>{children}</ZoraCreateProvider>
        </PrivyProvider>
      </WagmiProvider>
    </CrossmintProvider>
  );
}
