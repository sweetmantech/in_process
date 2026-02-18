import { DateTimePicker } from "@/components/ui/date-time-picker";

interface SaleStartPickerProps {
  saleStart: Date;
  currentSaleStart: number | string;
  setSaleStart: (date: Date) => void;
}

const SaleStartPicker = ({ saleStart, currentSaleStart, setSaleStart }: SaleStartPickerProps) => (
  <div>
    <p className="pb-2">
      sale start:{" "}
      {BigInt(currentSaleStart) === BigInt(0)
        ? "Open"
        : new Date(parseInt(currentSaleStart.toString(), 10) * 1000).toLocaleDateString()}
    </p>
    <DateTimePicker date={saleStart} setDate={setSaleStart} />
  </div>
);

export default SaleStartPicker;
