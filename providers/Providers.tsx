"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";
import UserProvider from "./UserProvider";
import { CrossmintProvider } from "./CrossmintProvider";
import FrameProvider from "./FrameProvider";
import LayoutProvider from "./LayoutProvider";
import UserCollectionsProvider from "./UserCollectionsProvider";
import EthPriceProvider from "./EthPriceProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <EthPriceProvider>
      <WagmiProvider>
        <CrossmintProvider>
          <PrivyProvider>
            <FrameProvider>
              <UserProvider>
                <MomentCreateProvider>
                  <UserCollectionsProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                  </UserCollectionsProvider>
                </MomentCreateProvider>
              </UserProvider>
            </FrameProvider>
          </PrivyProvider>
        </CrossmintProvider>
      </WagmiProvider>
    </EthPriceProvider>
  );
}
