"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { CHAIN } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";

const CreateButton = () => {
  const {
    create,
    name,
    imageUri,
    animationUri,
    textInputRef,
    uploadTextRefAsImage,
  } = useZoraCreateProvider();
  const { address } = useAccount();
  const router = useRouter();
  const { login } = usePrivy();

  const canCreate =
    address &&
    name &&
    (imageUri || animationUri || textInputRef?.current?.value);

  const handleCreate = async () => {
    try {
      if (!address) {
        login();
        return;
      }
      const uri = await uploadTextRefAsImage();
      const result = await create(uri);
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
      disabled={!canCreate}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Create
    </Button>
  );
};

export default CreateButton;
