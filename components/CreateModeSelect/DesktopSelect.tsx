import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import CTAButton from "./CTAButton";
import { useRouter, useSearchParams } from "next/navigation";
import useTypeParam from "@/hooks/useTypeParam";
import { getUrlWithType } from "@/lib/create/getUrlWithType";

const DesktopSelect = () => {
  const { titleRef } = useMetadataFormProvider();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const type = useTypeParam();
  const baseRoute = "/create";
  const isCreatePage = !type;
  const isWritingPage = type === "writing";
  const isLinkPage = type === "link";
  const isEmbedPage = type === "embed";

  const handleClick = (newType?: string) => {
    push(getUrlWithType(newType ?? null, searchParams.toString(), baseRoute));
  };
  return (
    <div className="h-fit w-full lg:max-w-[250px] xl:max-w-[300px]">
      <div ref={titleRef} className="flex flex-col gap-3 pb-3">
        <CTAButton isActive={isCreatePage} onClick={() => handleClick()}>
          new moment
        </CTAButton>
        <CTAButton isActive={isWritingPage} onClick={() => handleClick("writing")}>
          new thought
        </CTAButton>
        <CTAButton isActive={isLinkPage} onClick={() => handleClick("link")}>
          new link
        </CTAButton>
        <CTAButton isActive={isEmbedPage} onClick={() => handleClick("embed")}>
          new embed
        </CTAButton>
      </div>
    </div>
  );
};

export default DesktopSelect;
