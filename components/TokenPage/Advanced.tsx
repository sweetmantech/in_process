import { cn } from "@/lib/utils";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import { useState } from "react";

const Advanced = () => {
  const { amountToCollect, setAmountToCollect } = useMomentCollectProvider();
  const [isCustom, setIsCustom] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col gap-2 pt-4">
      {isCustom && (
        <input
          type="number"
          min={1}
          value={amountToCollect === 0 ? "" : amountToCollect}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              // Allow empty input during editing
              setAmountToCollect(0);
            } else {
              const parsed = parseInt(value, 10);
              setAmountToCollect(isNaN(parsed) ? 1 : Math.max(1, parsed));
            }
          }}
          onBlur={(e) => {
            // Ensure minimum value of 1 when user finishes editing
            const value = e.target.value;
            if (value === "" || parseInt(value, 10) < 1) {
              setAmountToCollect(1);
            }
          }}
          className="w-full border border-grey p-2 font-spectral !outline-none"
        />
      )}
      <div className="grid grid-cols-5 divide-x-[1px] divide-solid divide-grey-moss-200 overflow-hidden rounded-md border border-grey-moss-200">
        {[1, 33, 55, 111, undefined].map((count, index) => (
          <button
            type="button"
            className={cn(
              `text-md bg-grey-moss-100 p-2 font-spectral text-grey-moss-900 hover:bg-grey-moss-900 hover:text-grey-eggshell md:px-6 md:text-xl`,
              count === amountToCollect ? "bg-grey-moss-900 text-grey-eggshell" : ""
            )}
            onClick={() => {
              if (count) {
                setAmountToCollect(count);
                setIsCustom(false);
                return;
              }
              setAmountToCollect(1);
              setIsCustom(true);
            }}
            key={index}
          >
            {count || "other"}
          </button>
        ))}
      </div>
      <p className="text-md text-center font-spectral-italic md:text-xl">
        choose the amount you want to collect
      </p>
    </div>
  );
};

export default Advanced;
