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

/**
 * Root layout component that defines the HTML structure and global providers for the application.
 *
 * Wraps all pages with context providers, layout, and a notification toaster, applying global styles and supporting asynchronous loading with React Suspense.
 *
 * @param children - The page content to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-[url('/bg-gray.png')] bg-cover bg-top bg-no-repeat bg-fixed"
    >
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
