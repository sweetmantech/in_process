import { cn } from "@/lib/utils";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useState } from "react";

const Advanced = () => {
  const { mintCount, setMintCount } = useTokenProvider();
  const [isCustom, setIsCustom] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-2 pt-4">
      {isCustom && (
        <input
          type="number"
          min={1}
          value={mintCount}
          onChange={(e) => setMintCount(parseInt(e.target.value || "1", 10))}
          className="w-full border border-grey p-2 font-spectral !outline-none"
        />
      )}
      <div className="grid grid-cols-5 divide-x-[1px] divide-solid divide-grey-moss-200 rounded-md overflow-hidden border border-grey-moss-200">
        {[1, 33, 55, 111, undefined].map((count, index) => (
          <button
            type="button"
            className={cn(
              `p-2 md:px-6 font-spectral text-md md:text-xl bg-grey-moss-100 text-grey-moss-900
              hover:text-grey-eggshell hover:bg-grey-moss-900`,
              count === mintCount ? "bg-grey-moss-900 text-grey-eggshell" : "",
            )}
            onClick={() => {
              if (count) {
                setMintCount(count);
                setIsCustom(false);
                return;
              }
              setMintCount(1);
              setIsCustom(true);
            }}
            key={index}
          >
            {count || "other"}
          </button>
        ))}
      </div>
      <p className="text-center font-spectral-italic text-md md:text-xl">
        choose the amount you want to collect
      </p>
    </div>
  );
};

export default Advanced;
