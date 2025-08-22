import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown } from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Textarea } from "../ui/textarea";
import Price from "./Price";

const Advanced = () => {
  const {
    isOpenAdvanced,
    setIsOpenAdvanced,
    onChangeStartDate,
    startDate,
    description,
    setDescription,
  } = useZoraCreateProvider();

  return (
    <div className="flex flex-col gap-2 pt-2 z-10">
      <Button
        type="button"
        className="w-full h-fit p-0 mb-3 pb-1 self-center font-archivo font-medium border-b text-md border-grey-moss-300 rounded-none flex justify-between items-center"
        onClick={() => setIsOpenAdvanced(!isOpenAdvanced)}
      >
        advanced
        <ChevronDown
          className={`text-grey-moss-200 transition-transform duration-200 ${isOpenAdvanced ? "rotate-180" : ""}`}
        />
      </Button>
      {isOpenAdvanced && (
        <div className="relative mx-[-16px] px-[16px] bg-grey-moss-100">
          <p className="font-medium font-archivo ">Description</p>
          <Textarea
            placeholder="enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            className="resize-none font-spectral"
          />
          <Price />
          <p className="font-medium font-archivo pt-2">time</p>
          <DateTimePicker date={startDate} setDate={onChangeStartDate} />
        </div>
      )}
    </div>
  );
};

export default Advanced;
