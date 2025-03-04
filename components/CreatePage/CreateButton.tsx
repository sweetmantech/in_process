"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

const CreateButton = () => {
  const {
    create,
    name,
    imageUri,
    animationUri,
    textInputRef,
    uploadTextRefAsImage,
    creating,
  } = useZoraCreateProvider();
  const { address } = useAccount();
  const { login } = usePrivy();

  const canCreate = Boolean(
    !creating &&
      address &&
      name &&
      (imageUri || animationUri || textInputRef?.current?.value),
  );

  const handleCreate = async () => {
    try {
      if (!address) {
        login();
        return;
      }
      const uri = await uploadTextRefAsImage();
      await create(uri);
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={!canCreate}
      className="!font-archivo bg-black text-tan-primary w-full px-3 py-6 !text-lg !rounded-sm transform hover:scale-105 transition-transform duration-150 disabled:opacity-1 disabled:cursor-not-allowed"
    >
      {creating ? "Collecting..." : "Collect"}
    </Button>
  );
};

export default CreateButton;
