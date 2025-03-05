import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "@/components/ui/label";

const Description = () => {
  const { description, setDescription, fileUploading } =
    useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="description" className="font-archivo text-md">
        description
      </Label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-white !font-spectral px-4 py-3 border border-grey-secondary text-md !ring-0 !outline-0 disabled:text-gray-400 disabled:bg-gray-200"
        placeholder="i remember thinking/feeling/being..."
        disabled={fileUploading}
        rows={6}
      />
    </div>
  );
};

export default Description;
