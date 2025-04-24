"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreateButton from "./CreateButton";
import Price from "./Price";
import Prompt from "./Prompt";

const CreateForm = () => {
  const { createdContract, inputRef, name } = useZoraCreateProvider();
  return (
    <div className="w-full space-y-3 col-span-1 pl-12" ref={inputRef}>
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
  );
};

export default CreateForm;
