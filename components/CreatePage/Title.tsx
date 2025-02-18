import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Title = () => {
  const { name, setName } = useZoraCreateProvider();

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className="border border-black py-7 text-xl"
      />
    </div>
  );
};

export default Title;
