import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import LinkInput from "./LinkInput";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const LinkPreview = () => {
  const { createdContract, imageUri, link } = useZoraCreateProvider();

  return (
    <div className={`bg-white ${createdContract ? "" : "m-4 py-6 px-4"}`}>
      {createdContract ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getFetchableUrl(imageUri) || ""} alt="not found image" />
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
          <p className="text-center font-archivo">
            Paste any link from the internet
          </p>
          <LinkInput />
          {imageUri && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getFetchableUrl(imageUri) || ""}
              alt="not found image"
              className="pt-4"
            />
          )}
        </>
      )}
    </div>
  );
};

export default LinkPreview;
