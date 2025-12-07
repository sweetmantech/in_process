import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCTAButton = () => {
  const { push } = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      type="button"
      onClick={() => push("/create")}
      className="flex items-center gap-2 rounded-md bg-grey-moss-900 px-4 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
    >
      <div
        className={cn(
          "flex aspect-[1/1] w-5 items-center justify-center rounded-full border-[2px]",
          isHovered ? "border-grey-moss-900" : "border-grey-eggshell"
        )}
      >
        <div
          className={cn(
            "aspect-[1/1] w-3 rounded-full border-[2px]",
            isHovered ? "border-grey-moss-900" : "border-grey-eggshell"
          )}
        />
      </div>
      create
    </button>
  );
};

export default CreateCTAButton;
