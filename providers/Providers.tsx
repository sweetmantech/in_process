"use client";

import React, { ReactNode, useState, useEffect } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import FrameProvider from "./FrameProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletProvider from "./SmartWalletProvider";
import WayfinderProvider from "./WayfinderProvider";
import NotificationsProvider from "./NotificationsProvider";
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
            <NotificationsProvider>
              <SmartWalletProvider>
                <WayfinderProvider>
                  <LayoutProvider>{children}</LayoutProvider>
                </WayfinderProvider>
              </SmartWalletProvider>
            </NotificationsProvider>
          </UserProvider>
        </FrameProvider>
      </PrivyProvider>
    </WagmiProvider>
  );
}
