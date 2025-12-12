"use client";

import CreateForm from "@/components/CreateForm";
import CreateModeSelect from "@/components/CreateModeSelect";
import MaskLines from "@/components/CreateModeSelect/MaskLines";
import Moment from "@/components/Moment";
import MomentCreateProviderWrapper from "@/providers/MomentCreateProvider/MomentCreateProviderWrapper";
import { CollectionsProvider } from "@/providers/CollectionsProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MomentCreateProviderWrapper>
      <CollectionsProvider>
        <main className="w-screen grow">
          <div className="relative mt-12 grid w-full grid-cols-1 gap-6 px-6 md:mt-24 md:grid-cols-3 md:px-10">
            <MaskLines />
            <CreateModeSelect />
            <Moment>{children}</Moment>
            <CreateForm />
          </div>
        </main>
      </CollectionsProvider>
    </MomentCreateProviderWrapper>
  );
};

export default RootLayout;
