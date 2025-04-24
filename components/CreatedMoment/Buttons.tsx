import { CHAIN, PROD_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Image from "next/image";
import { toast } from "sonner";

const Buttons = () => {
  const {
    createdContract,
    setCreatedContract,
    reset,
    setCreatedTokenId,
    createdTokenId,
  } = useZoraCreateProvider();

  const share = async () => {
    const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
    await navigator.clipboard.writeText(
      `${PROD_URL}/collect/${shortNetworkName}:${createdContract}/${createdTokenId}`,
    );
    toast.success("copied!");
  };

  const toggle = () => {
    reset();
    setCreatedContract("");
    setCreatedTokenId("");
  };

  return (
    <div className="flex gap-2 pr-4 pt-4 relative">
      <div className="absolute w-1/2 aspect-[1/1] -right-10 bottom-0">
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
        className="w-full py-2 bg-grey-moss-900 hover:bg-grey-moss-300 font-archivo text-tan-primary rounded-sm relative text-2xl"
        onClick={toggle}
      >
        create
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo bg-grey-moss-100 hover:bg-grey-moss-300 hover:text-tan-primary hover:border-grey-moss-300 text-grey-moss-900 border border-grey-moss-900 rounded-sm relative text-2xl"
        onClick={share}
      >
        share
      </button>
    </div>
  );
};

export default Buttons;
