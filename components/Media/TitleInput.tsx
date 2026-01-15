import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { Input } from "../ui/input";

interface TitleInputProps {
  disabled: boolean;
  labelHidden: boolean;
}
const TitleInput = ({ disabled, labelHidden }: TitleInputProps) => {
  const { form } = useMetadataFormProvider();

  return (
    <fieldset>
      {!labelHidden && (
        <label className="text-grey-moss-600 mb-1 block font-archivo text-sm">title</label>
      )}
      <Input
        type="text"
        {...form.register("name")}
        placeholder="enter a title"
        disabled={disabled}
        className="font-spectral !text-md"
      />
      {form.formState.errors.name && (
        <p className="mt-1 font-spectral text-xs text-red-500">
          {form.formState.errors.name.message}
        </p>
      )}
    </fieldset>
  );
};

export default TitleInput;
