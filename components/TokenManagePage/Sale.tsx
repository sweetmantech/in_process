import useSaleConfig from "@/hooks/useSaleConfig";
import { Fragment } from "react";
import { DateTimePicker } from "../ui/date-time-picker";
import { useTokenProvider } from "@/providers/TokenProvider";

const Sale = () => {
  const { saleStart, setSaleStart, setSale, isLoading } = useSaleConfig();
  const { saleConfig } = useTokenProvider();

  if (!saleConfig) return <Fragment />;
  return (
    <div className="px-4 md:px-10 w-full font-archivo">
      <div className="pt-4 w-full flex flex-col gap-2 bg-white max-w-md rounded-2xl mt-4 p-4">
        {saleConfig.saleEnd === BigInt(0) ? (
          <div>sale is not yet activated.</div>
        ) : (
          <>
            <div>
              <p className="pb-2">
                sale start:{" "}
                {saleConfig.saleStart === BigInt(0)
                  ? "Open"
                  : new Date(
                      parseInt(saleConfig.saleStart.toString(), 10) * 1000,
                    ).toLocaleDateString()}
              </p>
              <DateTimePicker
                date={saleStart}
                setDate={(value) => setSaleStart(value)}
              />
            </div>
            <button
              className="bg-black text-grey-eggshell w-fit px-8 py-2 rounded-md"
              onClick={setSale}
              disabled={isLoading}
            >
              {isLoading ? "setting..." : "set sale"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sale;
