"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import CreateButton from "./CreateButton";
import Prompt from "./Prompt";
import Buttons from "../CreatedMoment/Buttons";
import Advanced from "./Advanced";
import Preview from "./Preview";
import Collections from "./Collections";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const CreateForm = () => {
  const { createdContract } = useMomentCreateProvider();
  const { inputRef, name } = useMetadataFormProvider();
  return (
    <div className="col-span-1 w-full md:pl-12">
      <div ref={inputRef} className="flex h-fit flex-col space-y-3 pb-4">
        {createdContract ? (
          <>
            <p className="text-center font-archivo-medium text-2xl md:text-left md:text-4xl">
              {name}
            </p>
            <p className="!m-0 text-center font-archivo md:text-left">
              {new Date().toLocaleString()}
            </p>
            <div className="block md:hidden">
              <Buttons />
            </div>
          </>
        ) : (
          <>
            <Collections />
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
