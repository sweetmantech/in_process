import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import usePrompt from "@/hooks/uesPrompt";

const Prompt = () => {
  const { form, fileUploading, creating } = useMomentCreateProvider();
  const { placeholder, onActive, promptRef } = usePrompt();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title" className="font-archivo text-md">
        prompt
      </Label>
      <Input
        {...form.register("name")}
        placeholder={placeholder}
        onFocus={onActive}
        className="!font-spectral !ring-0 !ring-offset-0 bg-white border-grey border rounded-[0px]"
        disabled={Boolean(fileUploading || creating)}
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
        <p className="text-xs text-red-500 font-spectral mt-1">
          {form.formState.errors.name.message}
        </p>
      )}
    </div>
  );
};

export default Prompt;
