import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Price from "./Price";
import SplitsForm from "./SplitsForm";
import { Controller } from "react-hook-form";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const Advanced = () => {
  const { isOpenAdvanced, form, setIsOpenAdvanced } = useMomentFormProvider();

  return (
    <div className="z-10 flex flex-col gap-2 pt-2">
      <Button
        type="button"
        className="text-md mb-3 flex h-fit w-full items-center justify-between self-center rounded-none border-b border-grey-moss-300 p-0 pb-1 font-archivo font-medium"
        onClick={() => setIsOpenAdvanced(!isOpenAdvanced)}
      >
        advanced
        <ChevronDown
          className={`text-grey-moss-200 transition-transform duration-200 ${isOpenAdvanced ? "rotate-180" : ""}`}
        />
      </Button>
      {isOpenAdvanced && (
        <div className="relative mx-[-16px] bg-grey-moss-100 px-[16px]">
          <p className="font-archivo font-medium">Description</p>
          <Textarea
            {...form.register("description")}
            placeholder="enter a description"
            minRows={3}
            className="resize-none font-spectral"
          />
          {form.formState.errors.description && (
            <p className="mt-1 font-spectral text-xs text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
          <Price />
          <SplitsForm />
          <p className="pt-2 font-archivo font-medium">time</p>
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
