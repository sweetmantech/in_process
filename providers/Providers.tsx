"use client";

import React, { ReactNode, useState, useEffect } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import MiniAppProvider from "./MiniAppProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletProvider from "./SmartWalletProvider";
import WayfinderProvider from "./WayfinderProvider";
import NotificationsProvider from "./NotificationsProvider";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
      <WagmiProvider>
        <PrivyProvider>
          <MiniAppProvider>
            <UserProvider>
              <NotificationsProvider>
                <SmartWalletProvider>
                  <WayfinderProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                  </WayfinderProvider>
                </SmartWalletProvider>
              </NotificationsProvider>
            </UserProvider>
          </MiniAppProvider>
        </PrivyProvider>
      </WagmiProvider>
    </GoogleReCaptchaProvider>
  );
}
