"use client";

import React, { ReactNode, useState, useEffect } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import FrameProvider from "./FrameProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletProvider from "./SmartWalletProvider";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage />;

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
