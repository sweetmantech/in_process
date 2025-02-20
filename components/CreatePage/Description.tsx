import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";

const Description = () => {
  const { description, setDescription, fileUploading } =
    useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="description">Description</Label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-md bg-background px-2 py-3 border border-black text-lg !ring-0 !outline-0 disabled:text-gray-400 disabled:bg-gray-200"
        placeholder="Description"
        disabled={fileUploading}
        rows={3}
      />
    </div>
  );
};

export default Description;
