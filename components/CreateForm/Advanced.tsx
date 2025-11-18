import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Price from "./Price";
import SplitsForm from "./SplitsForm";
import { Controller } from "react-hook-form";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const Advanced = () => {
  const { form, setIsOpenAdvanced, isOpenAdvanced } = useMomentCreateFormProvider();

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
            {...form.register("description")}
            placeholder="enter a description"
            minRows={3}
            className="resize-none font-spectral"
          />
          {form.formState.errors.description && (
            <p className="text-xs text-red-500 font-spectral mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
          <Price />
          <SplitsForm />
          <p className="font-medium font-archivo pt-2">time</p>
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker date={field.value} setDate={(date) => field.onChange(date)} />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Advanced;
