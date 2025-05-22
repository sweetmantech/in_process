import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import usePrompt from "@/hooks/uesPrompt";

const Prompt = () => {
  const { name, setName, fileUploading, creating } = useZoraCreateProvider();
  const { placeholder, onActive, promptRef } = usePrompt();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title" className="font-archivo text-md">
        prompt
      </Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        onFocus={onActive}
        className="!font-spectral !ring-0 !ring-offset-0 bg-white border-grey border rounded-[0px]"
        disabled={Boolean(fileUploading || creating)}
        ref={promptRef}
      />
    </div>
  );
};

export default Prompt;
