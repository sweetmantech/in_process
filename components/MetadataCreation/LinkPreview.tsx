import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import LinkInput from "./LinkInput";
import Image from "next/image";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { validateUrl } from "@/lib/url/validateUrl";

const LinkPreview = () => {
  const { createdTokenId } = useMomentCreateProvider();
  const { link, previewFileUrl } = useMetadataFormProvider();

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white py-6 px-4 ${createdTokenId ? "flex flex-col items-center " : "m-4"}`}
    >
      {createdTokenId ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewFileUrl} alt="not found image" />
          <div className="py-4 text-center">
            {validateUrl(link) ? (
              <a
                className="font-spectral-italic hover:text-grey-moss-400"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ) : (
              <p className="font-spectral-italic text-grey-moss-400">Invalid or unsafe URL</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2 pb-2 md:flex-row">
            <Image
              src="/link.svg"
              blurDataURL="/link.png"
              width={44}
              height={44}
              alt="not found link"
            />
            <p className="text-center font-archivo-medium">Paste any link from the internet</p>
          </div>
          <LinkInput />
          {previewFileUrl && (
            <div className="relative w-full mt-4 overflow-hidden aspect-video">
              <Image
                src={previewFileUrl}
                alt="not found image"
                fill
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-contain"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LinkPreview;
