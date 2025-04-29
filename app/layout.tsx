import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Layout from "@/components/Layout";

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
    <html lang="en" className="bg-[url('/bg-gray.png')] bg-cover">
      <body className="min-h-screen flex flex-col !overflow-x-hidden w-screen !lowercase">
        <Suspense>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
