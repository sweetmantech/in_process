"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "@/components/ui/spinner";
import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import BgNoiseWrapper from "../ui/texture-wrapper";

export default function CreatePage() {
  const { creating } = useZoraCreateProvider();

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        {creating ? (
          <div className="flex flex-col gap-2 items-center">
            <Spinner />
            <span>Creating Post!</span>
          </div>
        ) : (
          <div className="mx-auto min-h-screen flex flex-col items-center justify-center">
            <p className="text-3xl font-bold pb-8">Create on In Process</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-5">
                <MetadataCreation />
              </div>
              <div className="w-full flex flex-col items-start gap-4">
                <Title />
                <CreateButton />
              </div>
            </div>
          </div>
        )}
      </BgNoiseWrapper>
    </main>
  );
}
