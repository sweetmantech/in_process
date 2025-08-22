"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreateButton from "./CreateButton";
import Prompt from "./Prompt";
import Buttons from "../CreatedMoment/Buttons";
import Advanced from "./Advanced";
import Preview from "./Preview";

const CreateForm = () => {
  const { createdContract, inputRef, name } = useZoraCreateProvider();
  return (
    <div className="w-full col-span-1 md:pl-12">
      <div ref={inputRef} className="flex flex-col space-y-3 h-fit pb-4">
        {createdContract ? (
          <>
            <p className="text-center md:text-left font-archivo-medium text-2xl md:text-4xl">
              {name}
            </p>
            <p className="font-archivo md:text-left text-center !m-0">
              {new Date().toLocaleString()}
            </p>
            <div className="block md:hidden">
              <Buttons />
            </div>
          </>
        ) : (
          <>
            <Prompt />
            <Advanced />
            <Preview />
            <CreateButton />
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
