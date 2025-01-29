"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { CHAIN } from "@/lib/consts";

const CreateButton = () => {
  const { create, name, imageUri, animationUri } = useZoraCreateProvider();
  const { address } = useAccount();
  const router = useRouter();

  const isDisabled = !address || !name || (!imageUri && !animationUri);

  const handleCreate = async () => {
    try {
      const result = await create();
      if (result?.contractAddress && CHAIN) {
        const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
        if (!shortNetworkName) {
          console.error("Unknown network:", CHAIN.name);
          return;
        }
        router.push(`/collect/${shortNetworkName}:${result.contractAddress}`);
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={isDisabled}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Create
    </Button>
  );
};

export default CreateButton;
