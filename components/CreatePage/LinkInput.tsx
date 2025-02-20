import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LinkInput = () => {
  const { link, setLink, fileUploading } = useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="link">Link</Label>
      <Input
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-black py-4 text-lg !ring-0 !outline-0 disabled:text-gray-400 disabled:bg-gray-200"
        placeholder="Link"
        disabled={fileUploading}
      />
    </div>
  );
};

export default LinkInput;
