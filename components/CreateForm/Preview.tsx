import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { Label } from "../ui/label";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import PreviewModal from "./PreviewModal";

const Preview = () => {
  const { previewUri } = useZoraCreateProvider();
  return (
    <div>
      {previewUri && (
        <>
          <Label>preview</Label>
          <section className="mt-1 aspect-video border border-grey relative overflow-hidden cursor-pointer">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={getFetchableUrl(previewUri) || ""}
              alt="not found preview."
            />
          </section>
        </>
      )}
      <PreviewModal />
    </div>
  );
};

export default Preview;
