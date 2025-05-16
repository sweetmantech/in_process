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
      className="px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
    >
      <div
        className={cn(
          "border-[2px]  rounded-full w-5 aspect-[1/1] flex items-center justify-center",
          isHovered ? "border-grey-moss-900" : "border-grey-eggshell",
        )}
      >
        <div
          className={cn(
            "border-[2px] rounded-full w-3 aspect-[1/1]",
            isHovered ? "border-grey-moss-900" : "border-grey-eggshell",
          )}
        />
      </div>
      create
    </button>
  );
};

export default CreateCTAButton;
