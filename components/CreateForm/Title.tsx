import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";
import { ComboboxInput } from "../ui/combobox-input";

const promptOptions = [
  { label: "this is time when...", value: "this is time when " },
  { label: "today i...", value: "today i " },
  { label: "yesterday i...", value: "yesterday i " },
  { label: "i...", value: "i " },
  { label: "write anything", value: "write anything " },
];
const Title = () => {
  const { name, setName, fileUploading } = useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title" className="font-archivo text-md">
        prompt
      </Label>
      <ComboboxInput
        onChange={(value) => setName(value)}
        options={promptOptions}
        value={name}
        disabled={fileUploading}
      />
    </div>
  );
};

export default Title;
