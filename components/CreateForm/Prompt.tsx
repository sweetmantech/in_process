import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import usePrompt from "@/hooks/usePrompt";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const Prompt = () => {
  const { creating } = useMomentCreateProvider();
  const { form } = useMetadataFormProvider();
  const { placeholder, onActive, promptRef, rotatePrompt } = usePrompt();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label htmlFor="title" className="text-md font-archivo">
        title
      </Label>
      <Input
        {...form.register("name")}
        placeholder={placeholder}
        onFocus={onActive}
        onBlur={rotatePrompt}
        className="rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
        disabled={Boolean(creating)}
        ref={(e) => {
          const { ref } = form.register("name");
          ref(e);
          if (promptRef) {
            if (typeof promptRef === "function") {
              promptRef(e);
            } else {
              promptRef.current = e;
            }
          }
        }}
      />
      {form.formState.errors.name && (
        <p className="mt-1 font-spectral text-xs text-red-500">
          {form.formState.errors.name.message}
        </p>
      )}
    </div>
  );
};

export default Prompt;
