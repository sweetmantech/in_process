import { Input } from "@/components/ui/input";
import { LinkIcon } from "../ui/icons";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const LinkInput = () => {
  const { link, setLink } = useMetadataFormProvider();

  return (
    <div className="mt-4 flex items-center border border-grey-moss-100 bg-grey-moss-50 px-4">
      <LinkIcon />
      <Input
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="!text-md !border-none !bg-transparent py-4 text-center !font-spectral !text-grey-moss-900 !outline-none !ring-0 !ring-offset-0 disabled:text-grey-moss-400"
      />
    </div>
  );
};

export default LinkInput;
