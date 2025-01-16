"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useAccount } from "wagmi";

const CreateButton = () => {
  const { create, name, imageUri, animationUri } = useZoraCreateProvider();
  const { address } = useAccount();

  const isDisabled = !address || !name || (!imageUri && !animationUri);

  return (
    <Button
      onClick={() => create()}
      disabled={isDisabled}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Create
    </Button>
  );
};

export default CreateButton;
