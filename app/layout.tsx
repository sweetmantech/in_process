import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import LoginButton from "@/components/LoginButton";

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
        <Providers>
          <LoginButton className="fixed top-4 right-6 z-10" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
