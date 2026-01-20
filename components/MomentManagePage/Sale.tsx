import useSaleConfig from "@/hooks/useSaleConfig";
import { Fragment } from "react";
import { DateTimePicker } from "../ui/date-time-picker";
import { useMomentProvider } from "@/providers/MomentProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import Warning from "./Warning";

const Sale = () => {
  const { saleStart, setSaleStart, setSale, isLoading } = useSaleConfig();
  const { saleConfig, isOwner } = useMomentProvider();
  const hasWarning = useMomentLegacyWarning();

  if (!saleConfig) return <Fragment />;
  return (
    <div className="w-full font-archivo">
      <div className="mt-4 flex w-full max-w-md flex-col gap-2 rounded-2xl bg-white p-4 pt-4">
        {BigInt(saleConfig.saleEnd) === BigInt(0) ? (
          <div>sale is not yet activated.</div>
        ) : (
          <>
            <Warning />
            <div>
              <p className="pb-2">
                sale start:{" "}
                {BigInt(saleConfig.saleStart) === BigInt(0)
                  ? "Open"
                  : new Date(
                      parseInt(saleConfig.saleStart.toString(), 10) * 1000
                    ).toLocaleDateString()}
              </p>
              <DateTimePicker date={saleStart} setDate={(value) => setSaleStart(value)} />
            </div>
            <button
              className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
              onClick={setSale}
              disabled={isLoading || !isOwner || hasWarning}
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
