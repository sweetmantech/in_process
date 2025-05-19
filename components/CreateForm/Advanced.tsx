import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown } from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Textarea } from "../ui/textarea";

const Advanced = () => {
  const { 
    isOpenAdvanced, 
    setIsOpenAdvanced, 
    onChangeStartDate, 
    startDate,
    description,
    setDescription
  } = useZoraCreateProvider();

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
          <p className="font-medium font-archivo mt-4">Description:</p>
          <Textarea 
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px]"
          />
          <p className="font-medium font-archivo">Start Time:</p>
          <DateTimePicker date={startDate} setDate={onChangeStartDate} />
          
        </>
      )}
    </div>
  );
};

export default Advanced;
