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
    <div className="space-y-2 pt-3 relative">
      <div className="absolute w-1/2 aspect-[1/1] -right-10 bottom-10">
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
        className="w-full py-2 bg-black font-archivo text-tan-primary rounded-sm relative text-2xl"
        onClick={share}
      >
        share
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-black rounded-sm relative text-2xl"
        onClick={toggle}
      >
        create
      </button>
    </div>
  );
};

export default Buttons;
