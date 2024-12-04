"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider>
      <PrivyProvider>
        <ZoraCreateProvider>{children}</ZoraCreateProvider>
      </PrivyProvider>
    </WagmiProvider>
  );
}
