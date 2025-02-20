"use client";

import {
  CrossmintProvider as Crossmint,
  CrossmintCheckoutProvider,
} from "@crossmint/client-sdk-react-ui";

export default function CrossmintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Crossmint apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY as string}>
      <CrossmintCheckoutProvider>{children}</CrossmintCheckoutProvider>
    </Crossmint>
  );
}
