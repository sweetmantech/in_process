import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown } from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const Advanced = () => {
  const { isOpenAdvanced, setIsOpenAdvanced, onChangeStartDate, startDate } =
    useZoraCreateProvider();

  return (
    <div className="flex flex-col gap-2 pt-4">
      <Button
        type="button"
        className="w-fit self-center border border-grey rounded-full flex gap-2 items-center"
        onClick={() => setIsOpenAdvanced(!isOpenAdvanced)}
      >
        Advanced
        <ChevronDown
          className={`text-grey-moss-900 transition-transform duration-200 ${isOpenAdvanced ? "rotate-180" : ""}`}
        />
      </Button>
      {isOpenAdvanced && (
        <>
          <p className="font-medium font-archivo">Start Time:</p>
          <DateTimePicker date={startDate} setDate={onChangeStartDate} />
        </>
      )}
    </div>
  );
};

export default Advanced;
