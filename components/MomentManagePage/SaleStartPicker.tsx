import { DateTimePicker } from "@/components/ui/date-time-picker";

interface SaleStartPickerProps {
  saleStart: Date;
  currentSaleStart: number | string;
  setSaleStart: (date: Date) => void;
}

const SaleStartPicker = ({ saleStart, currentSaleStart, setSaleStart }: SaleStartPickerProps) => {
  const normalized = BigInt(String(Math.floor(Number(currentSaleStart))));
  return (
    <div>
      <p className="pb-2">
        sale start:{" "}
        {normalized === BigInt(0)
          ? "Open"
          : new Date(Number(normalized) * 1000).toLocaleDateString()}
      </p>
      <DateTimePicker date={saleStart} setDate={setSaleStart} />
    </div>
  );
};

export default SaleStartPicker;
