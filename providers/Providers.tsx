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
          <UserProvider>
            <ZoraCreateProvider>
              <FrameProvider>{children}</FrameProvider>
            </ZoraCreateProvider>
          </UserProvider>
        </PrivyProvider>
      </CrossmintProvider>
    </WagmiProvider>
  );
}
