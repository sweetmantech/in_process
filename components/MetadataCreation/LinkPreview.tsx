import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import LinkInput from "./LinkInput";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const LinkPreview = () => {
  const { createdContract, imageUri } = useZoraCreateProvider();

  return (
    <div
      className={`size-full flex flex-col relative border border-grey-400 px-12 py-4 ${createdContract ? "pointer-events-none" : "bg-white"}`}
    >
      {createdContract ? (
        <Image
          src={getFetchableUrl(imageUri) || ""}
          alt="not found image"
          objectFit="cover"
          objectPosition="center"
          layout="fill"
        />
      ) : (
        <>
          <p className="text-center font-archivo">
            Paste any link from the internet
          </p>
          {imageUri && (
            <div className="mt-2 grow relative w-full">
              <Image
                src={getFetchableUrl(imageUri) || ""}
                alt="not found image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          )}
          <LinkInput />
        </>
      )}
    </div>
  );
};

export default LinkPreview;
