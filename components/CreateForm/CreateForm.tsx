"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreateButton from "./CreateButton";
import Price from "./Price";
import Prompt from "./Prompt";

const CreateForm = () => {
  const { createdContract, inputRef, name } = useZoraCreateProvider();
  return (
    <div className="w-full col-span-1 md:pl-12">
      <div ref={inputRef} className="space-y-3 h-fit pb-4">
        {createdContract ? (
          <>
            <p className="font-archivo-medium text-4xl">{name}</p>
          </>
        ) : (
          <>
            <Prompt />
            <Price />
            <CreateButton />
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
