"use client";

import { Label } from "@/components/ui/label";

type Currency = "ETH" | "USD";

interface CurrencySelectProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  disabled?: boolean;
}

export default function CurrencySelect({ value, onChange, disabled }: CurrencySelectProps) {
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="currency" className="font-archivo text-md">
        currency
      </Label>
      <div className="flex overflow-hidden border border-grey-secondary">
        <select
          id="currency"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as Currency)}
          disabled={disabled}
          className="w-full !font-spectral !rounded-[0px] !border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2"
        >
          <option value="ETH">ETH</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
  );
}