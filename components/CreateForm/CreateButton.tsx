"use client";

import { Button } from "@/components/ui/button";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const CreateButton = () => {
  const {
    create,
    name,
    imageUri,
    animationUri,
    writingText,
    creating,
    embedCode,
  } = useZoraCreateProvider();

  const canCreate = Boolean(
    !creating && name && (imageUri || animationUri || writingText || embedCode),
  );

  const handleCreate = async () => {
    try {
      await create();
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={!canCreate}
      className="self-center w-fit z-10 px-14 py-5 md:py-6 md:w-full md:!mt-4 !font-archivo bg-black hover:bg-grey-moss-300 text-grey-eggshell md:h-[60px] !text-xl !rounded-sm transform transition-transform duration-150 disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
    >
      {creating ? "creating..." : "create"}
    </Button>
  );
};

export default CreateButton;
