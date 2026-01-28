"use client";

import React, { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import FrameProvider from "./FrameProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletProvider from "./SmartWalletProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  return (
    <WagmiProvider>
      <PrivyProvider>
        <FrameProvider>
          <UserProvider>
            <SmartWalletProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </SmartWalletProvider>
          </UserProvider>
        </FrameProvider>
      </PrivyProvider>
    </WagmiProvider>
  );
}
