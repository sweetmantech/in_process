"use client";

import {
  CrossmintProvider as Crossmint,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";
import { Fragment } from "react";

export function CrossmintProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CROSSMINT_API_KEY)
    return <Fragment>NEXT_PUBLIC_CROSSMINT_API_KEY environment variable is not set</Fragment>;

  return (
    <Crossmint apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
      <CrossmintCheckoutProvider>{children}</CrossmintCheckoutProvider>
    </Crossmint>
  );
}
