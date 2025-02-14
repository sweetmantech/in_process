"use client";

import { AlignEndHorizontal, AlignEndVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface LayoutOption {
  id: "horizontal" | "vertical";
  icon: React.ReactNode;
}
const layouts: LayoutOption[] = [
  {
    id: "horizontal",
    icon: <AlignEndHorizontal className="h-6 w-6" />,
  },
  {
    id: "vertical",
    icon: <AlignEndVertical className="h-6 w-6" />,
  },
];

interface LayoutToggleProps {
  selectedLayout: "horizontal" | "vertical";
  setSelectedLayout: Dispatch<SetStateAction<"horizontal" | "vertical">>;
}

export default function LayoutToggle({
  selectedLayout,
  setSelectedLayout,
}: LayoutToggleProps) {
  return (
    <div className="w-full flex justify-end pt-10">
      <div className="flex rounded-sm border-black border-[2px] overflow-hidden">
        {layouts.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedLayout(option.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition duration-[300ms] ease-in",
              selectedLayout === option.id
                ? "bg-black text-white"
                : "hover:bg-muted",
              option.id === "vertical" && "border-l border-black",
            )}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
