"use client";

type Currency = "ETH" | "USD";

interface CurrencySelectProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  disabled?: boolean;
}

export default function CurrencySelect({ value, onChange, disabled }: CurrencySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Currency)}
      disabled={disabled}
      className="bg-white px-3 py-2 !font-spectral !rounded-[0px] !border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[60px]"
    >
      <option value="ETH">ETH</option>
      <option value="USD">USD</option>
    </select>
  );
}