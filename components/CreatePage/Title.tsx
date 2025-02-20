import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Title = () => {
  const { name, setName, fileUploading } = useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className="border border-black py-4 text-lg !ring-0 !outline-0 disabled:text-gray-400 disabled:bg-gray-200"
        placeholder="Name"
        disabled={fileUploading}
      />
    </div>
  );
};

export default Title;
