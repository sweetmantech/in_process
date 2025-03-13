import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "../ui/icons";

const LinkInput = () => {
  const { link, setLink, fileUploading } = useZoraCreateProvider();

  return (
    <div className="mt-4 flex bg-background-dark items-center px-4">
      <LinkIcon />
      <Input
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="text-center !border-none py-4 !bg-transparent text-lg !ring-0 !ring-offset-0 !outline-none !text-red-dark"
        disabled={fileUploading}
      />
    </div>
  );
};

export default LinkInput;
