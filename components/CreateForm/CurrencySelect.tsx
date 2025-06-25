"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

export default function CurrencySelect() {
  const { priceUnit, setPriceUnit, fileUploading, creating } = useZoraCreateProvider();
  
  return (
    <select
      value={priceUnit === "usdc" ? "USD" : "ETH"}
      onChange={(e) => setPriceUnit(e.target.value === "USD" ? "usdc" : "eth")}
      disabled={Boolean(fileUploading || creating)}
      className="bg-white px-3 font-spectral !rounded-[0px] !border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[70px] text-center appearance-none cursor-pointer h-auto py-0"
    >
      <option value="ETH">ETH</option>
      <option value="USD">USD</option>
    </select>
  );
}