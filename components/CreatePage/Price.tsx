"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const currencies = ["eth", "usd", "base", "usdc"];

export default function Price() {
  const { price, setPrice, priceUnit, setPriceUnit } = useZoraCreateProvider();

  return (
    <div className="w-full space-y-2">
      <Label htmlFor="price" className="font-archivo text-md">
        price
      </Label>
      <div className="flex overflow-hidden border border-grey-secondary">
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="flex-grow !font-medium !rounded-[0px] !border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          step="0.01"
        />
        <div className="bg-white">
          <div className="w-[1px] h-6 bg-grey-secondary my-2" />
        </div>
        <Select
          value={priceUnit}
          onValueChange={(value) => setPriceUnit(value as any)}
        >
          <SelectTrigger className="!border-none !font-archivo w-[80px] !px-2 !py-0 !h-10 !rounded-[0px] bg-white focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="w-[120px]">
            {currencies.map((curr) => (
              <SelectItem key={curr} value={curr}>
                <div className="flex items-center justify-between w-full !font-archivo">
                  <span>{curr}</span>
                  <Check className="ml-2 h-4 w-4 opacity-0 group-data-[state=checked]:opacity-100" />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
