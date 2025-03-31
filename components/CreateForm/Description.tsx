import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import usePrompt from "@/hooks/uesPrompt";

const Description = () => {
  const { description, setDescription, fileUploading, creating } =
    useZoraCreateProvider();
  const { placeholder, onActive } = usePrompt();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title" className="font-archivo text-md">
        description
      </Label>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={placeholder}
        onFocus={onActive}
        className="!ring-0 !ring-offset-0 bg-white border-grey border rounded-[0px]"
        disabled={Boolean(fileUploading || creating)}
      />
    </div>
  );
};

export default Description;
