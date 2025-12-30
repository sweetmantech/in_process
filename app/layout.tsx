import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import ClientProvidersWrapper from "@/components/ClientProvidersWrapper";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-grey-moss-100">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress harmless browser extension errors related to back/forward cache
              if (typeof chrome !== 'undefined' && chrome.runtime) {
                const originalSendMessage = chrome.runtime.sendMessage;
                chrome.runtime.sendMessage = function(...args) {
                  try {
                    return originalSendMessage.apply(this, args);
                  } catch (error) {
                    if (error.message && error.message.includes('message channel is closed')) {
                      return;
                    }
                    throw error;
                  }
                };
              }
              
              // Suppress console errors for extension port closure
              const originalError = console.error;
              console.error = function(...args) {
                const message = args.join(' ');
                if (message.includes('runtime.lastError') && 
                    message.includes('message channel is closed')) {
                  return;
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen w-screen flex-col !overflow-x-hidden !lowercase">
        <Suspense>
          <ClientProvidersWrapper>{children}</ClientProvidersWrapper>
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
