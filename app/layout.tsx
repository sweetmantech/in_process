import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/providers/Providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Process",
  description: "A timeline for artists. Upload work-in-progress, rewrite history in real time.",
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
      <body className="flex min-h-screen w-full flex-col !overflow-x-hidden !lowercase">
        <Suspense>
          <Providers>{children}</Providers>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
