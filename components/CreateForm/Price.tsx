"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";
import CurrencySelect from "./CurrencySelect";

export default function Price() {
  const { form, fileUploading, creating } = useMomentCreateProvider();

  return (
    <div className="w-full pt-2">
      <Label htmlFor="price" className="font-archivo text-md">
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
            onChange: (e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                form.setValue("price", val, { shouldValidate: true });
              }
            },
          })}
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          className="flex-grow !font-spectral !rounded-[0px] !border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={Boolean(fileUploading || creating)}
        />
        <div className="bg-white">
          <div className="w-[1px] h-6 bg-grey-secondary my-2" />
        </div>
        <CurrencySelect />
      </div>
      {form.formState.errors.price && (
        <p className="text-xs text-red-500 font-spectral mt-1">
          {form.formState.errors.price.message}
        </p>
      )}
    </div>
  );
}
