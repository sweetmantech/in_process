import { Input } from "@/components/ui/input";
import { LinkIcon } from "../ui/icons";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";
import { useMomentMetadataProvider } from "@/providers/MomentCreateProviderWrapper/MomentMetadataProvider";

const LinkInput = () => {
  const { fileUploading } = useMomentMetadataProvider();
  const { link, setLink } = useMomentCreateFormProvider();

  return (
    <div className="mt-4 flex bg-grey-moss-50 border border-grey-moss-100 items-center px-4">
      <LinkIcon />
      <Input
        id="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="text-center !border-none py-4 !bg-transparent !font-spectral !text-md !ring-0 !ring-offset-0 !outline-none !text-grey-moss-900 disabled:text-grey-moss-400"
        disabled={fileUploading}
      />
    </div>
  );
};

export default LinkInput;
