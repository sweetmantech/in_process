"use client";

import MomentCreateProviderWrapper from "@/providers/MomentCreateProvider/MomentCreateProviderWrapper";
import { CollectionsProvider } from "@/providers/CollectionsProvider";
import { ReactNode } from "react";
import { CreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import CollectionCreateProviderWrapper from "@/providers/CollectionCreateProvider/CollectionCreateProviderWrapper";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CreateCollectionModalTriggerProvider>
      <CollectionsProvider>
        <MomentCreateProviderWrapper>
          <main className="w-screen grow">
            <div className="relative mt-12 grid w-full grid-cols-1 gap-6 px-6 md:mt-24 md:grid-cols-3 md:px-10">
              {children}
            </div>
          </main>
        </MomentCreateProviderWrapper>
        <CollectionCreateProviderWrapper />
      </CollectionsProvider>
    </CreateCollectionModalTriggerProvider>
  );
};

export default RootLayout;
