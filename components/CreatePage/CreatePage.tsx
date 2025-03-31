"use client";

import MetadataCreation from "@/components/MetadataCreation";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreatedMoment from "../CreatedMoment/CreatedMoment";
import Moment from "./Moment";
import CreateForm from "../CreateForm";

export default function CreatePage() {
  const { createdContract, name, inputRef } = useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      <div className="flex flex-col items-center justify-center pt-[120px] md:pt-[200px]">
        <div className="w-full">
          <div className="px-3 md:px-10 flex flex-col md:flex-row gap-10 pb-20 relative">
            <div className="grow flex flex-col md:flex-row gap-4">
              {createdContract ? <CreatedMoment /> : <Moment />}
              <div className="grow w-full flex justify-center">
                <MetadataCreation />
              </div>
            </div>
            <div className="w-full md:!min-w-[420px] md:!w-[420px]">
              <div className="w-full space-y-3" ref={inputRef}>
                {createdContract ? (
                  <>
                    <p className="font-archivo-medium text-4xl">{name}</p>
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
