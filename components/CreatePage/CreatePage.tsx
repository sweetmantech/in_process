"use client";

import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import Description from "./Description";
import Price from "./Price";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import MaskLines from "./MaskLines";
import CreatedMoment from "./CreatedMoment";
import Moment from "./Moment";

export default function CreatePage() {
  const { createModeActive, createdContract, name, description, inputRef } =
    useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      <div className="flex flex-col items-center justify-center pt-[200px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 mt-4 relative min-h-[500px]">
            {createModeActive && !createdContract && <MaskLines />}
            {createdContract ? <CreatedMoment /> : <Moment />}
            <div className="flex flex-col items-center gap-5">
              <MetadataCreation />
            </div>
            <div className="w-full pr-20">
              <div className="w-full space-y-3" ref={inputRef}>
                {createdContract ? (
                  <>
                    <p className="font-archivo text-4xl">{name}</p>
                    <p className="font-spectral text-xl">{description}</p>
                  </>
                ) : (
                  <>
                    <Title />
                    <Description />
                    <Price />
                    <CreateButton />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
