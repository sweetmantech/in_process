"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import UserProvider from "./UserProvider";
import CrossmintProvider from "./CrossmintProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider>
      <CrossmintProvider>
        <PrivyProvider>
          <UserProvider>
            <ZoraCreateProvider>{children}</ZoraCreateProvider>
          </UserProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </WagmiProvider>
  );
}
