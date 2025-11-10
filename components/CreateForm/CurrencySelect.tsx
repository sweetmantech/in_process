"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";

export default function CurrencySelect() {
  const { form, fileUploading, creating } = useMomentCreateProvider();

  return (
    <select
      {...form.register("priceUnit")}
      disabled={Boolean(fileUploading || creating)}
      className="bg-white px-3 font-spectral !rounded-[0px] !border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[70px] text-center appearance-none cursor-pointer h-auto py-0"
    >
      <option value="eth">ETH</option>
      <option value="usdc">USD</option>
    </select>
  );
}
