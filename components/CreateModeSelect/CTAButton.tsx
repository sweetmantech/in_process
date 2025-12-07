import { ReactNode, useState } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const CTAButton = ({ children, onClick, isActive }: CTAButtonProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <button
      type="button"
      className={`flex w-fit items-center gap-4 font-archivo-medium disabled:cursor-not-allowed ${
        isActive
          ? "text-2xl text-grey-moss-900 xl:text-4xl"
          : "text-xl text-grey-moss-400 hover:text-grey-moss-900 xl:text-3xl"
      }`}
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div
        className={`flex aspect-[1/1] w-[29px] items-center justify-center rounded-full ${isActive ? "bg-grey-moss-900" : ` ${hovered ? "border border-grey-moss-400" : "bg-transparent"}`}`}
      >
        {hovered && !isActive && (
          <div className="aspect-[1/1] w-[15px] rounded-full bg-grey-moss-400" />
        )}
      </div>
      {children}
    </button>
  );
};

export default CTAButton;
