"use client";

import { ReactNode, useEffect, useState } from "react";
import { Providers } from "@/providers/Providers";
import Layout from "@/components/Layout";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen grow flex-col bg-[url('/bg-gray.png')] bg-cover bg-fixed bg-top bg-no-repeat" />
    );
  }

  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
