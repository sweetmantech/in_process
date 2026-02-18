import { Input } from "@/components/ui/input";

interface SalePriceInputProps {
  priceInput: string;
  priceUnit: string;
  disabled: boolean;
  setPriceInput: (value: string) => void;
}

const SalePriceInput = ({
  priceInput,
  priceUnit,
  disabled,
  setPriceInput,
}: SalePriceInputProps) => (
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
        disabled={disabled}
      />
      <div className="bg-white">
        <div className="my-2 h-6 w-[1px] bg-grey-secondary" />
      </div>
      <div className="flex items-center bg-white px-3 font-archivo text-sm">{priceUnit}</div>
    </div>
  </div>
);

export default SalePriceInput;
