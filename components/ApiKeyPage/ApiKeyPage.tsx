"use client";

import { Fragment } from "react";
import ApiKeyManager from "./ApiKeyManager";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { usePrivy } from "@privy-io/react-auth";

const ApiKeyPage = () => {
  const { artistWallet } = useUserProvider();
  const { ready } = usePrivy();

  if (!ready) return <Fragment />;
  if (!artistWallet) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:px-8 md:py-0">
      <ApiKeyManager />
    </main>
  );
};

export default ApiKeyPage;
