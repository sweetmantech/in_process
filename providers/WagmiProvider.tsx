import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { coinbaseWallet } from "wagmi/connectors";
import { createConfig, http, WagmiProvider as WProvider } from "wagmi";
import { CHAIN } from "@/lib/consts";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [CHAIN],
  connectors: [
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
