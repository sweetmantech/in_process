import Image from "next/image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import LinkInput from "./LinkInput";

const LinkPreview = () => {
  const { createdContract, previewSrc, link } = useZoraCreateProvider();

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${createdContract ? "" : "m-4 py-6 px-4"} h-[calc(100%-2rem)]`}
    >
      {createdContract ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc} alt="not found image" />
          <div className="text-center py-4">
            <a
              className="font-spectral-italic hover:text-grey-moss-400"
              href={link}
              target="_blank"
            >
              {link}
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-center gap-2 pb-2">
            <Image
              src="/link.svg"
              blurDataURL="/link.png"
              width={44}
              height={44}
              unoptimized
              alt="not found link"
            />
            <p className="text-center font-archivo-medium">
              Paste any link from the internet
            </p>
          </div>
          <LinkInput />
          {previewSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="relative w-full mt-2 min-h-full md:min-h-[calc(80%-1rem)] overflow-hidden">
              <Image
                src={previewSrc}
                alt="Preview image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="object-contain rounded-lg"
                quality={100}
                priority
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LinkPreview;
