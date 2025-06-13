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
      `${PROD_URL}/collect/${shortNetworkName}:${createdContract}/${createdTokenId || 1}`
    );
    toast.success("copied!");
  };

  const toggle = () => {
    reset();
    setCreatedContract("");
    setCreatedTokenId("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-2 pr-4 pt-4 relative">
      <div className="hidden md:block absolute w-1/2 aspect-[1/1] -right-10 bottom-0">
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
        className="w-full py-2 bg-grey-moss-900 hover:bg-grey-moss-300 font-archivo text-grey-eggshell rounded-sm relative text-2xl"
        onClick={toggle}
      >
        create
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo bg-grey-moss-100 hover:bg-grey-moss-300 hover:text-grey-eggshell hover:border-grey-moss-300 text-grey-moss-900 border border-grey-moss-900 rounded-sm relative text-2xl"
        onClick={share}
      >
        share
      </button>
    </div>
  );
};

export default Buttons;
