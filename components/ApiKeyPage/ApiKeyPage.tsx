"use client";

import { Fragment, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import ApiKeyManager from "./ApiKeyManager";
import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";

const ApiKeyPage = () => {
  const { artistWallet } = useUserProvider();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { ready } = usePrivy();

  useEffect(() => {
    if (ready)
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, [ready]);

  if (!loaded) return <Fragment />;
  if (!artistWallet) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:px-8 md:py-0">
      <ApiKeyManager />
    </main>
  );
};

export default ApiKeyPage;
