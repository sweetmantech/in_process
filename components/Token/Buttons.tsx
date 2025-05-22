import useConnectedWallet from "@/hooks/useConnectedWallet";
import useDownload from "@/hooks/useDownload";
import useShareMoment from "@/hooks/useShareMoment";
import { useTokenProvider } from "@/providers/TokenProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const { setCollected } = useTokenProvider();
  const { push } = useRouter();
  const { connectedWallet } = useConnectedWallet();
  const { share } = useShareMoment();
  const { download, isDownloading } = useDownload();

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
        className="w-full py-2 bg-grey-moss-900 font-archivo text-grey-eggshell rounded-sm relative text-2xl hover:bg-grey-moss-300"
        onClick={share}
      >
        share
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-grey-moss-900 rounded-sm relative text-2xl hover:bg-grey-moss-900 hover:text-grey-eggshell"
        onClick={visit}
      >
        visit timeline
      </button>
      <button
        type="button"
        className="w-full py-2 font-archivo text-black border border-grey-moss-900 rounded-sm relative text-2xl hover:bg-grey-moss-900 hover:text-grey-eggshell"
        onClick={download}
        disabled={isDownloading}
      >
        download
      </button>
    </div>
  );
};

export default Buttons;
