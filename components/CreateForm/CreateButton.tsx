"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "@/hooks/useConnectedWallet";

const CreateButton = () => {
  const { create, name, imageUri, animationUri, writingText, creating } =
    useZoraCreateProvider();
  const { connectedWallet } = useConnectedWallet();
  const { login } = usePrivy();

  const canCreate = Boolean(
    !creating && name && (imageUri || animationUri || writingText),
  );

  const handleCreate = async () => {
    try {
      if (!connectedWallet) {
        login();
        return;
      }
      await create();
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={!canCreate}
      className="md:!mt-6 !font-archivo bg-black hover:bg-grey-moss-300 text-tan-primary w-full px-3 py-6 md:h-[60px] !text-xl !rounded-sm transform transition-transform duration-150 disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
    >
      {creating ? "creating..." : "create"}
    </Button>
  );
};

export default CreateButton;
