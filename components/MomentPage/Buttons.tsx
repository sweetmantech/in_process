import useConnectedWallet from "@/hooks/useConnectedWallet";
import useDownload from "@/hooks/useDownload";
import useShareMoment from "@/hooks/useShareMoment";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const { setCollected } = useMomentCollectProvider();
  const { push } = useRouter();
  const { connectedWallet } = useConnectedWallet();
  const { share } = useShareMoment();
  const { download, isDownloading } = useDownload();

  const visit = () => {
    setCollected(true);
    push(`/${connectedWallet}`);
  };

  return (
    <div className="relative space-y-2 pt-3">
      <div className="absolute -right-10 bottom-0 aspect-[1/1] w-1/2">
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
        onClick={share}
      >
        share
      </button>
      <button
        type="button"
        className="relative w-full rounded-sm border border-grey-moss-900 py-2 font-archivo text-2xl text-black hover:bg-grey-moss-900 hover:text-grey-eggshell"
        onClick={visit}
      >
        visit timeline
      </button>
      <button
        type="button"
        className="relative w-full rounded-sm border border-grey-moss-900 py-2 font-archivo text-2xl text-black hover:bg-grey-moss-900 hover:text-grey-eggshell"
        onClick={download}
        disabled={isDownloading}
      >
        download
      </button>
    </div>
  );
};

export default Buttons;
