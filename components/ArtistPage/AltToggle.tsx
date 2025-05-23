import { Dispatch, SetStateAction } from "react";
import { GridIcon, TimeLineIcon } from "../ui/icons";

interface AltToggleProps {
  alt: "timeline" | "grid";
  setAlt: Dispatch<SetStateAction<"timeline" | "grid">>;
}
const AltToggle = ({ alt, setAlt }: AltToggleProps) => {
  return (
    <div className="min-w-[80px] md:-translate-y-full grid grid-cols-2 border-[1px] border-black rounded-sm overflow-hidden z-[1000]">
      <button
        type="button"
        className={`col-span-1 flex items-center justify-center p-1.5 ${alt === "timeline" ? "bg-black" : "bg-transparent"}`}
        onClick={() => setAlt("timeline")}
      >
        <TimeLineIcon
          fill="none"
          stroke={`${alt === "timeline" ? "#E5D19ECC" : "#000000"}`}
        />
      </button>
      <button
        type="button"
        className={`col-span-1 flex items-center justify-center p-1.5 ${alt === "grid" ? "bg-black" : "bg-transparent"}`}
        onClick={() => setAlt("grid")}
      >
        <GridIcon
          fill="none"
          stroke={`${alt === "grid" ? "#E5D19ECC" : "#000000"}`}
        />
      </button>
    </div>
  );
};

export default AltToggle;
