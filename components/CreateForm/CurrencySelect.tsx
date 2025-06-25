"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

type Currency = "ETH" | "USD";

export default function CurrencySelect() {
  const { priceUnit, setPriceUnit, fileUploading, creating } = useZoraCreateProvider();
  
  return (
    <select
      value={priceUnit === "usdc" ? "USD" : "ETH"}
      onChange={(e) => setPriceUnit(e.target.value === "USD" ? "usdc" : "eth")}
      disabled={Boolean(fileUploading || creating)}
      className="bg-white px-3 py-2 !font-spectral !rounded-[0px] !border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[60px]"
    >
      <option value="ETH">ETH</option>
      <option value="USD">USD</option>
    </select>
  );
}