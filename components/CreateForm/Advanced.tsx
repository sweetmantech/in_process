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
    <div className="flex flex-col gap-2 pt-4 z-10">
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
        <div className="relative mx-[-16px] px-[16px] pb-4 bg-grey-moss-100">
          <p className="font-medium font-archivo mt-4">Description:</p>
          <Textarea 
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            className="resize-none"
          />
          <p className="font-medium font-archivo">Start Time:</p>
          <DateTimePicker date={startDate} setDate={onChangeStartDate}/>
          <div className="absolute left-0 right-0 px-[16px] pb-32 bg-grey-moss-100">
          </div>
        </div>
      )}
    </div>
  );
};

export default Advanced;
