import { cn } from "@/lib/utils";

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "min-w-[80px] font-archivo-medium text-base md:text-md",
        active && "border-b-[2px] border-b-grey-moss-300"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
