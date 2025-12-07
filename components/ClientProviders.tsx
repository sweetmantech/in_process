"use client";

import { ReactNode } from "react";
import { Providers } from "@/providers/Providers";
import Layout from "@/components/Layout";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
