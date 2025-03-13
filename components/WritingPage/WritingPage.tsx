"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreatedMoment from "../CreatedMoment/CreatedMoment";
import Moment from "./Moment";
import TextCreation from "../MetadataCreation/TextCreation";
import MaskLines from "./MaskLines";
import CreateForm from "../CreateForm";

export default function WritingPage() {
  const { createdContract, name, description, inputRef } =
    useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      <div className="flex flex-col items-center justify-center pt-[200px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 mt-4 relative min-h-[500px]">
            {!createdContract && <MaskLines />}
            {createdContract ? <CreatedMoment /> : <Moment />}
            <div className="flex flex-col items-center gap-5">
              <TextCreation />
            </div>
            <div className="w-full pr-20">
              <div className="w-full space-y-3" ref={inputRef}>
                {createdContract ? (
                  <>
                    <p className="font-archivo-medium text-4xl">{name}</p>
                    <p className="font-spectral text-xl">{description}</p>
                  </>
                ) : (
                  <CreateForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
