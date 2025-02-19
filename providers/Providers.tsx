"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import {
  CrossmintProvider,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";
import UserProvider from "./UserProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CrossmintProvider
      apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}
    >
      <CrossmintCheckoutProvider>
        <WagmiProvider>
          <PrivyProvider>
            <UserProvider>
              <ZoraCreateProvider>{children}</ZoraCreateProvider>
            </UserProvider>
          </PrivyProvider>
        </WagmiProvider>
      </CrossmintCheckoutProvider>
    </CrossmintProvider>
  );
}
