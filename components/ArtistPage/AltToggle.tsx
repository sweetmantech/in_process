import { Dispatch, SetStateAction } from "react";
import { GridIcon, TimeLineIcon } from "../ui/icons";

interface AltToggleProps {
  alt: "timeline" | "grid";
  setAlt: Dispatch<SetStateAction<"timeline" | "grid">>;
  showMutualButton?: boolean;
  mutualActive?: boolean;
  onMutualClick?: () => void;
}
const AltToggle = ({
  alt,
  setAlt,
  showMutualButton = false,
  mutualActive = false,
  onMutualClick,
}: AltToggleProps) => {
  return (
    <div className="flex gap-2 items-center">
      {showMutualButton && (
        <div className="min-w-[90px] md:min-w-[100px] md:-translate-y-full border-[1px] border-black rounded-sm overflow-hidden z-[1000]">
          <button
            type="button"
            className={`w-full flex items-center justify-center p-1.5 leading-none ${
              mutualActive ? "bg-black text-[#E5D19ECC]" : "bg-transparent text-black"
            }`}
            onClick={onMutualClick}
          >
            Mutual
          </button>
        </div>
      )}
      <div className="min-w-[80px] md:-translate-y-full grid grid-cols-2 border-[1px] border-black rounded-sm overflow-hidden z-[1000]">
        <button
          type="button"
          className={`col-span-1 flex items-center justify-center p-1.5 ${alt === "timeline" ? "bg-black" : "bg-transparent"}`}
          onClick={() => setAlt("timeline")}
        >
          <TimeLineIcon fill="none" stroke={`${alt === "timeline" ? "#E5D19ECC" : "#000000"}`} />
        </button>
        <button
          type="button"
          className={`col-span-1 flex items-center justify-center p-1.5 ${alt === "grid" ? "bg-black" : "bg-transparent"}`}
          onClick={() => setAlt("grid")}
        >
          <GridIcon fill="none" stroke={`${alt === "grid" ? "#E5D19ECC" : "#000000"}`} />
        </button>
      </div>
    </div>
  );
};

export default AltToggle;
