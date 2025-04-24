import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { ReactNode, useState } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const CTAButton = ({ children, onClick, isActive }: CTAButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const { fileUploading } = useZoraCreateProvider();

  return (
    <button
      type="button"
      className={`flex items-center gap-4 w-fit font-archivo-medium 
        disabled:cursor-not-allowed
        ${
          isActive
            ? "text-grey-moss-900 text-2xl xl:text-4xl"
            : "text-grey-moss-400 hover:text-grey-moss-900 text-xl xl:text-3xl"
        }`}
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      disabled={fileUploading}
    >
      <div
        className={`flex justify-center items-center w-[29px] rounded-full aspect-[1/1] 
          ${isActive ? "bg-grey-moss-900" : ` ${hovered ? "border border-grey-moss-400" : "bg-transparent"}`}`}
      >
        {hovered && !isActive && (
          <div className="w-[15px] aspect-[1/1] bg-grey-moss-400 rounded-full" />
        )}
      </div>
      {children}
    </button>
  );
};

export default CTAButton;
