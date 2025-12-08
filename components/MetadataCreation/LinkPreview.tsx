import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import LinkInput from "./LinkInput";
import Image from "next/image";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const LinkPreview = () => {
  const { createdContract } = useMomentCreateProvider();
  const { link, previewFileUrl } = useMomentFormProvider();

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white ${createdContract ? "" : "m-4 px-4 py-6"}`}
    >
      {createdContract ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewFileUrl} alt="not found image" />
          <div className="py-4 text-center">
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
          <div className="flex flex-col items-center gap-2 pb-2 md:flex-row">
            <Image
              src="/link.svg"
              blurDataURL="/link.png"
              width={44}
              height={44}
              unoptimized
              alt="not found link"
            />
            <p className="text-center font-archivo-medium">Paste any link from the internet</p>
          </div>
          <LinkInput />
          {previewFileUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewFileUrl} alt="not found image" className="pt-4" />
          )}
        </>
      )}
    </div>
  );
};

export default LinkPreview;
