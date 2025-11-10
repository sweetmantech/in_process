import { useFieldArray } from "react-hook-form";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";
import useSplitAddressHandler from "@/hooks/useSplitAddressHandler";

const useSplitsForm = () => {
  const { form } = useMomentCreateProvider();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "splits",
  });

  const { handleAddressChange } = useSplitAddressHandler({
    setValue: form.setValue,
    setError: form.setError,
    clearErrors: form.clearErrors,
  });

  const handleAddSplit = () => {
    append({ address: "", percentAllocation: 0 });
    setTimeout(() => form.trigger("splits"), 0);
  };

  const handleRemoveSplit = (index: number) => {
    remove(index);
    setTimeout(() => form.trigger("splits"), 0);
  };

  return {
    form,
    fields,
    handleAddressChange,
    handleAddSplit,
    handleRemoveSplit,
  };
};

export default useSplitsForm;
