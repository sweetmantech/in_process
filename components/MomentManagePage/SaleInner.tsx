"use client";

import useSetSale from "@/hooks/useSetSale";
import { useMomentProvider } from "@/providers/MomentProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import Warning from "./Warning";
import GrantMomentPermissionButton from "./GrantMomentPermissionButton";
import SaleSkeleton from "./SaleSkeleton";
import SaleStartPicker from "./SaleStartPicker";
import SalePriceInput from "./SalePriceInput";

const SaleInner = () => {
  const { saleStart, setSaleStart, priceInput, setPriceInput, priceUnit, setSale, isLoading } =
    useSetSale();
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
            <SaleStartPicker
              saleStart={saleStart}
              currentSaleStart={saleConfig.saleStart}
              setSaleStart={setSaleStart}
            />
            <SalePriceInput
              priceInput={priceInput}
              priceUnit={priceUnit}
              disabled={isLoading}
              setPriceInput={setPriceInput}
            />
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
