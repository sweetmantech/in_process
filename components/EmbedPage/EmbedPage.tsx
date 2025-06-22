import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { X } from "lucide-react";
import Image from "next/image";
import isHtml from "is-html";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const EmbedPage = () => {
  const { embedCode, embed, createdContract, animationUri, name } =
    useZoraCreateProvider();

  if (createdContract)
    return (
      <div className="size-full rounded-2xl overflow-hidden h-fit">
        <div
          dangerouslySetInnerHTML={{
            __html: embedCode,
          }}
        />
        <div className="text-center py-4 bg-white">
          <a
            className="font-spectral-italic hover:text-grey-moss-400"
            href={getFetchableUrl(animationUri) || "#"}
            target="_blank"
          >
            {name}
          </a>
        </div>
      </div>
    );
  return (
    <div className="size-full p-2 flex flex-col items-center">
      <div className="relative flex flex-col w-full grow overflow-hidden">
        <div className="relative z-[4] bg-white grow flex flex-col gap-4 py-4 px-2 md:px-8 overflow-hidden rounded-2xl">
          <div className="flex flex-col items-center">
            <Image
              src={"/flower.svg"}
              blurDataURL="/flower.png"
              alt="not found flower"
              width={69}
              height={66}
              className="block md:hidden"
            />
            <p className="font-archivo-medium text-center">paste embed code</p>
          </div>
          <textarea
            className="bg-grey-moss-50 w-full grow !outline-none !ring-0 p-2 font-spectral"
            value={embedCode}
            onChange={(e) => embed(e.target.value)}
          />
          {isHtml(embedCode) && embedCode && (
            <Image
              src="/embed_code_check.svg"
              blurDataURL="/embed_code_check.png"
              alt="not found check"
              width={46}
              height={46}
              className="self-center"
            />
          )}
          {!isHtml(embedCode) && embedCode && (
            <div className="self-center w-[46px] aspect-[1/1] border-[2px] border-red-dark rounded-full flex items-center justify-center">
              <X className="size-7 text-red-dark" />
            </div>
          )}
        </div>
      </div>
      <Image
        src={"/flower.svg"}
        blurDataURL="/flower.png"
        alt="not found flower"
        className="hidden md:block"
        width={193}
        height={183}
      />
    </div>
  );
};

export default EmbedPage;
