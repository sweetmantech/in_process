"use client";

import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import Description from "./Description";
import Price from "./Price";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import MaskLines from "./MaskLines";
import Buttons from "./Buttons";

export default function CreatePage() {
  const {
    createModeActive,
    createdContract,
    name,
    description,
    inputRef,
    titleRef,
  } = useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      <div className="flex flex-col items-center justify-center pt-[200px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 mt-4 relative min-h-[500px]">
            {createModeActive && !createdContract && <MaskLines />}
            <div className="pl-20 h-fit">
              <div
                ref={titleRef}
                className={`flex items-end gap-3 ${createdContract ? "w-full" : "w-fit"}`}
              >
                <div className="w-full">
                  <p className="font-archivo text-4xl font-bold">
                    {createdContract ? "moment created" : "new moment"}
                  </p>
                  {createdContract && <Buttons />}
                </div>
                {createModeActive && !createdContract && (
                  <>
                    <div className="size-2 rotate-[45deg] bg-black translate-y-[-8px]" />
                    <p className="font-grotesk-light text-xl tracking-[-1px]">
                      create
                    </p>
                  </>
                )}
              </div>
            </div>
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
