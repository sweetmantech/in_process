"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import UserProvider from "./UserProvider";
import { CrossmintProvider } from "./CrossmintProvider";
import JamProvider from "./JamProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider>
      <CrossmintProvider>
        <PrivyProvider>
          <UserProvider>
            <ZoraCreateProvider>
              <JamProvider>{children}</JamProvider>
            </ZoraCreateProvider>
          </UserProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </WagmiProvider>
  );
}
