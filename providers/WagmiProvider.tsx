import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { coinbaseWallet } from "wagmi/connectors";
import { createConfig, http, WagmiProvider as WProvider } from "wagmi";
import { CHAIN } from "@/lib/consts";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [CHAIN],
  connectors: [
    farcasterFrame(),
    coinbaseWallet({
      appName: "myco.wtf",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    8453: http(),
    84532: http(),
  },
});

const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WProvider config={config}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WProvider>
);

export { WagmiProvider };
