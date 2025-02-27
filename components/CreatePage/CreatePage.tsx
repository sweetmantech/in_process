"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Spinner from "@/components/ui/spinner";
import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import BgNoiseWrapper from "../ui/texture-wrapper";
import Description from "./Description";
import LinkInput from "./LinkInput";
import JamMedia from "../JamMedia";

export default function CreatePage() {
  const { creating } = useZoraCreateProvider();

  return (
    <main className="w-full flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper>
        {creating ? (
          <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
            <Spinner />
            <span>Creating Post!</span>
          </div>
        ) : (
          <div className="mx-auto min-h-screen flex flex-col items-center justify-center pt-20">
            <p className="text-3xl font-bold pb-2">Create on In Process</p>
            <div className="w-full max-w-5xl px-4">
              <JamMedia />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col items-center gap-5">
                  <MetadataCreation />
                </div>
                <div className="w-full flex flex-col items-start gap-2">
                  <LinkInput />
                  <Title />
                  <Description />
                  <CreateButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </BgNoiseWrapper>
    </main>
  );
}
