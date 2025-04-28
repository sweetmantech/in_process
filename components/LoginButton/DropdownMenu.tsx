import { useFrameProvider } from "@/providers/FrameProvider";
import Image from "next/image";

interface DropdownMenuProps {
  onLogout: () => void;
}

export function DropdownMenu({ onLogout }: DropdownMenuProps) {
  const { context } = useFrameProvider();

  return (
    <div className="absolute left-0 right-0 bg-[#1C1C1C] shadow-lg font-archivo z-50 rounded-b-sm border-t-0">
      <div className="flex justify-center">
        <div className="w-4/5 h-px bg-grey-moss-50" />
      </div>
      <div className="px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="text-white text-base">total earnings</div>
          <Image
            src="/images/dropdown-ellipse.svg"
            alt="Dropdown indicator"
            width={24}
            height={24}
          />
        </div>
        <div className="text-white text-base mt-2 font-spectral">$55</div>
      </div>
      <div className="flex justify-center">
        <div className="w-4/5 h-px bg-grey-moss-50" />
      </div>
      <div className="px-4 py-2">
        <div className="text-white text-base">timeline</div>
      </div>
      {!context && (
        <>
          <div className="flex justify-center">
            <div className="w-4/5 h-px bg-grey-moss-50" />
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-white text-base hover:bg-[#333333] hover:rounded-b-sm transition-colors"
          >
            log out
          </button>
        </>
      )}
    </div>
  );
}
