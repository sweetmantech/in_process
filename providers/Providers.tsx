"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import UserProvider from "./UserProvider";
import { CrossmintProvider } from "./CrossmintProvider";
import FrameProvider from "./FrameProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider>
      <CrossmintProvider>
        <PrivyProvider>
          <FrameProvider>
            <UserProvider>
              <ZoraCreateProvider>{children}</ZoraCreateProvider>
            </UserProvider>
          </FrameProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </WagmiProvider>
  );
}
