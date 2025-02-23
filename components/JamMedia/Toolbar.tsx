import { useJamProvider } from "@/providers/JamProvider";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Crop, Plus } from "lucide-react";

const Toolbar = () => {
  const { onAdd, onCrop } = useJamProvider();
  const { fileUploading } = useZoraCreateProvider();

  return (
    <section className="flex items-center mb-1 bg-white w-fit rounded-md py-1 px-2">
      <button onClick={onAdd} className="border-r hover:scale-[1.1] px-1">
        <Plus className="size-4" />
      </button>
      <div className="h-full w-1 bg-gray" />
      <button
        onClick={onCrop}
        className="px-1 hover:scale-[1.1] disabled:cursor-not-allowed disabled:text-gray-300"
        disabled={fileUploading}
      >
        <Crop className="size-4" />
      </button>
    </section>
  );
};

export default Toolbar;
