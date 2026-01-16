import { Textarea } from "../ui/textarea";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

interface DescriptionInputProps {
  disabled: boolean;
  labelHidden: boolean;
}
const DescriptionInput = ({ disabled, labelHidden }: DescriptionInputProps) => {
  const { form } = useMetadataFormProvider();
  return (
    <fieldset>
      {!labelHidden && (
        <label className="text-grey-moss-600 mb-1 block font-archivo text-sm">description</label>
      )}
      <Textarea
        {...form.register("description")}
        className="focus:border-grey-moss-500 !font-spectral !text-md"
        minRows={3}
        maxRows={10}
        placeholder="enter a description"
        disabled={disabled}
      />
      {form.formState.errors.description && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.description.message}
        </p>
      )}
    </fieldset>
  );
};

export default DescriptionInput;
