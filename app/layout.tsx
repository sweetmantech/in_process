import { WagmiProvider } from "@/providers/wagmi-provider";
import { ZoraCreateProvider } from "@/providers/zora-create-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider>
          <ZoraCreateProvider>{children}</ZoraCreateProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
