import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/providers/Providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Process",
  description:
    "A Web3-native platform for documenting and monetizing the creative journey. Upload work-in-progress, mint onchain, and build a living archive of artistic evolution.",
  alternates: {
    types: {
      "text/plain": "/llms.txt",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-grey-moss-100">
      <body className="flex min-h-screen w-screen flex-col !overflow-x-hidden !lowercase">
        <Suspense>
          <Providers>{children}</Providers>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
