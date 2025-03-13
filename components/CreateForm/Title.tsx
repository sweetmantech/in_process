import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Title = () => {
  const { name, setName, fileUploading } = useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title" className="font-archivo text-md">
        prompt
      </Label>
      <Select
        onValueChange={(value) => setName(value)}
        value={name}
        disabled={fileUploading}
      >
        <SelectTrigger className="!text-grey-primary !font-spectral w-full bg-white !border !border-grey-secondary !rounded-[0px] !ring-0">
          <SelectValue className="!rounded-0" />
        </SelectTrigger>
        <SelectContent className="!font-spectral text-md text-grey-primary">
          <SelectItem value="this is time when...">
            this is time when...
          </SelectItem>
          <SelectItem value="today i...">today i...</SelectItem>
          <SelectItem value="yesterday i...">yesterday i...</SelectItem>
          <SelectItem value="i...">i...</SelectItem>
          <SelectItem value="write anything">write anything</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Title;
