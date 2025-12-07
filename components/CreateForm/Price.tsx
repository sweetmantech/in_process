"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import CurrencySelect from "./CurrencySelect";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

export default function Price() {
  const { form } = useMomentFormProvider();
  const { creating } = useMomentCreateProvider();

  return (
    <div className="w-full pt-2">
      <Label htmlFor="price" className="text-md font-archivo">
        price
      </Label>
      <div className="flex overflow-hidden border border-grey-secondary">
        <Input
          id="price"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          {...form.register("price", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                form.setValue("price", val, { shouldValidate: true });
              }
            },
          })}
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          className="flex-grow !rounded-[0px] !border-none bg-white !font-spectral [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          disabled={Boolean(creating)}
        />
        <div className="bg-white">
          <div className="my-2 h-6 w-[1px] bg-grey-secondary" />
        </div>
        <CurrencySelect />
      </div>
      {form.formState.errors.price && (
        <p className="mt-1 font-spectral text-xs text-red-500">
          {form.formState.errors.price.message}
        </p>
      )}
    </div>
  );
}
