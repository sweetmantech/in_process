"use client";

import CreateButton from "./CreateButton";
import Prompt from "./Prompt";
import Advanced from "./Advanced";
import Preview from "./Preview";
import Collections from "./Collections";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const CreateForm = () => {
  const { inputRef } = useMetadataFormProvider();

  return (
    <div className="col-span-1 w-full md:pl-12">
      <div ref={inputRef} className="flex h-fit flex-col space-y-3 pb-4">
        <Collections />
        <Prompt />
        <Advanced />
        <Preview />
        <CreateButton />
      </div>
    </div>
  );
};

export default CreateForm;
