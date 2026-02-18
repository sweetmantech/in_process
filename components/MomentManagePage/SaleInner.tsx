"use client";

import useSetSale from "@/hooks/useSetSale";
import { DateTimePicker } from "../ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { useMomentProvider } from "@/providers/MomentProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import Warning from "./Warning";
import GrantMomentPermissionButton from "./GrantMomentPermissionButton";
import SaleSkeleton from "./SaleSkeleton";

const SaleInner = () => {
  const { saleStart, setSaleStart, priceInput, setPriceInput, priceUnit, setSale, isLoading } = useSetSale();
  const { saleConfig, isOwner } = useMomentProvider();
  const hasWarning = useMomentLegacyWarning();

  if (!saleConfig) return <SaleSkeleton />;

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
            <div className="w-full pt-2">
              <p className="pb-1 font-archivo text-md">price</p>
              <div className="flex overflow-hidden border border-grey-secondary">
                <Input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={priceInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*\.?\d*$/.test(val)) setPriceInput(val);
                  }}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="flex-grow !rounded-[0px] !border-none bg-white !font-spectral [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={isLoading}
                />
                <div className="bg-white">
                  <div className="my-2 h-6 w-[1px] bg-grey-secondary" />
                </div>
                <div className="flex items-center bg-white px-3 font-archivo text-sm">
                  {priceUnit}
                </div>
              </div>
            </div>
            {hasWarning ? (
              <GrantMomentPermissionButton />
            ) : (
              <button
                className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
                onClick={setSale}
                disabled={isLoading || !isOwner}
              >
                {isLoading ? "setting..." : "set sale"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SaleInner;
