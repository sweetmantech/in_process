"use client";

import { Fragment, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import ApiKeyManager from "./ApiKeyManager";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";

const ApiKeyPage = () => {
  const { connectedAddress } = useUserProvider();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { ready } = usePrivy();

  useEffect(() => {
    if (ready)
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, [ready]);

  if (!loaded) return <Fragment />;
  if (!connectedAddress) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-archivo-bold tracking-tight text-balance text-grey-moss-900">
            API Key Manager
          </h1>
          <p className="text-grey-primary font-spectral-italic text-pretty">
            Create and manage your API keys for programmatic access to In Process
          </p>
        </div>
        <ApiKeyManager />
      </div>
    </main>
  );
};

export default ApiKeyPage;
