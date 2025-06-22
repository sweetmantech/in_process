import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-grey-moss-100">
      <body className="min-h-screen flex flex-col !overflow-x-hidden w-screen !lowercase">
        <Suspense>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
