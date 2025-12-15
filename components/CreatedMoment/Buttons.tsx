import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import Image from "next/image";
import { toast } from "sonner";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useParams } from "next/navigation";

const Buttons = () => {
  const { createdContract, setCreatedContract } = useMomentCreateProvider();
  const { resetForm } = useMetadataFormProvider();
  const params = useParams();
  const tokenId = params.tokenId as string;

  const share = async () => {
    const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
    await navigator.clipboard.writeText(
      `${SITE_ORIGINAL_URL}/collect/${shortNetworkName}:${createdContract}/${tokenId || 1}`
    );
    toast.success("copied!");
  };

  const toggle = () => {
    resetForm();
    setCreatedContract("");
  };

  return (
    <div className="relative flex flex-col gap-4 pr-4 pt-4 md:flex-row md:gap-2">
      <div className="absolute -right-10 bottom-0 hidden aspect-[1/1] w-1/2 md:block">
        <Image
          src="/semi-transparent.png"
          alt="not found semi"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <button
        type="button"
        className="relative w-full rounded-sm bg-grey-moss-900 py-2 font-archivo text-2xl text-grey-eggshell hover:bg-grey-moss-300"
        onClick={toggle}
      >
        create
      </button>
      <button
        type="button"
        className="relative w-full rounded-sm border border-grey-moss-900 bg-grey-moss-100 py-2 font-archivo text-2xl text-grey-moss-900 hover:border-grey-moss-300 hover:bg-grey-moss-300 hover:text-grey-eggshell"
        onClick={share}
      >
        share
      </button>
    </div>
  );
};

export default Buttons;
