import { cn } from "@/lib/utils";
import { useTokenProvider } from "@/providers/TokenProvider";

const Advanced = () => {
  const { mintCount, setMintCount } = useTokenProvider();

  return (
    <div className="w-full flex flex-col gap-4 pb-4">
      <fieldset>
        <label className="font-archivo">moments count to collect</label>
        <input
          type="number"
          min={1}
          value={mintCount}
          onChange={(e) => setMintCount(parseInt(e.target.value || "1", 10))}
          className="w-full border border-grey p-2 font-spectral !outline-none"
        />
      </fieldset>
      <div className="flex gap-2 w-full justify-between">
        {[1, 11, 33, 55].map((count, index) => (
          <button
            type="button"
            className={cn(
              "px-6 py-1 rounded-full font-archivo bg-grey-moss-900 text-tan-primary hover:bg-grey-moss-300",
              count === mintCount ? "bg-grey-moss-300" : "",
            )}
            onClick={() => setMintCount(count || 2)}
            key={index}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Advanced;
