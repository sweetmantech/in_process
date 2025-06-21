"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import UserProvider from "./UserProvider";
import { CrossmintProvider } from "./CrossmintProvider";
import FrameProvider from "./FrameProvider";
import LayoutProvider from "./LayoutProvider";
import UserCollectionsProvider from "./UserCollectionsProvider";
import EthPriceProvider from "./EthPriceProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EthPriceProvider>
      <WagmiProvider>
        <CrossmintProvider>
          <PrivyProvider>
            <FrameProvider>
              <UserProvider>
                <ZoraCreateProvider>
                  <UserCollectionsProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                  </UserCollectionsProvider>
                </ZoraCreateProvider>
              </UserProvider>
            </FrameProvider>
          </PrivyProvider>
        </CrossmintProvider>
      </WagmiProvider>
    </EthPriceProvider>
  );
}
