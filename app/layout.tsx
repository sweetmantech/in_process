import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import LoginButton from "@/components/LoginButton";
import Logo from "@/components/Logo";

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
      <body className="bg-tan">
        <Providers>
          <Logo className="fixed left-10 top-10 z-10" />
          <LoginButton className="fixed right-10 top-8 z-10" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
