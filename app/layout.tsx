import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "In Process",
  description: "Imagined by LATASHÁ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-nounish antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
