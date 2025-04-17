import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Header from "@/components/Header";

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
    <html lang="en" className="bg-[url('/bg.png')] bg-cover">
      <body className="min-h-screen flex flex-col !overflow-x-hidden w-screen !lowercase">
        <Suspense>
          <Providers>
            <Header />
            <div className="grow relative flex flex-col">{children}</div>
            <Footer />
          </Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
