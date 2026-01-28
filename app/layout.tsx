import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-grey-moss-100">
      <body className="flex min-h-screen w-screen flex-col !overflow-x-hidden !lowercase">
        <Suspense>
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
