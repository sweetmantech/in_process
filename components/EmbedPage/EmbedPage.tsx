import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { X } from "lucide-react";
import Image from "next/image";
import isHtml from "is-html";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const EmbedPage = () => {
  const { createdContract } = useMomentCreateProvider();
  const { embedCode, setEmbedCode, name } = useMetadataFormProvider();

  if (createdContract)
    return (
      <div className="size-full h-fit overflow-hidden rounded-2xl">
        <div
          dangerouslySetInnerHTML={{
            __html: embedCode,
          }}
        />
        <div className="bg-white py-4 text-center">
          <p className="font-spectral-italic">{name}</p>
        </div>
      </div>
    );
  return (
    <div className="flex size-full flex-col items-center p-2">
      <div className="relative flex w-full grow flex-col overflow-hidden">
        <div className="relative z-[4] flex grow flex-col gap-4 overflow-hidden rounded-2xl bg-white px-2 py-4 md:px-8">
          <div className="flex flex-col items-center">
            <Image
              src={"/flower.svg"}
              blurDataURL="/flower.png"
              alt="not found flower"
              width={69}
              height={66}
              className="block md:hidden"
            />
            <p className="text-center font-archivo-medium">paste embed code</p>
          </div>
          <textarea
            className="w-full grow bg-grey-moss-50 p-2 font-spectral !outline-none !ring-0"
            value={embedCode}
            onChange={(e) => setEmbedCode(e.target.value)}
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
            <div className="flex aspect-[1/1] w-[46px] items-center justify-center self-center rounded-full border-[2px] border-red-dark">
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
