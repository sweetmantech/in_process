import useConnectedWallet from "@/hooks/useConnectedWallet";
import { CHAIN } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useTokenProvider } from "@/providers/TokenProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Buttons = () => {
  const { token, setCollected } = useTokenProvider();
  const { push } = useRouter();
  const { connectedWallet } = useConnectedWallet();

  const share = async () => {
    const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
    await navigator.clipboard.writeText(
      `https://inprocess.myco.wtf/collect/${shortNetworkName}:${token.token.contract.address}/${token.token.tokenId}`,
    );
    toast.success("copied!");
  };

  const visit = () => {
    setCollected(true);
    push(`/${connectedWallet}`);
  };

  return (
    <div className="space-y-2 pt-3 relative">
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
        className="w-full py-2 bg-black font-archivo text-tan-primary rounded-sm relative text-2xl"
        onClick={share}
      >
        share
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-black rounded-sm relative text-2xl"
        onClick={visit}
      >
        visit timeline
      </button>
    </div>
  );
};

export default Buttons;
