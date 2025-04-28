"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CreateButton from "./CreateButton";
import Price from "./Price";
import Prompt from "./Prompt";
import Buttons from "../CreatedMoment/Buttons";

const CreateForm = () => {
  const { createdContract, inputRef, name } = useZoraCreateProvider();
  return (
    <div className="w-full col-span-1 md:pl-12">
      <div ref={inputRef} className="space-y-3 h-fit pb-4">
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
            <Price />
            <CreateButton />
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
