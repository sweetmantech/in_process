import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import CTAButton from "./CTAButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useTypeParam from "@/hooks/useTypeParam";

const DesktopSelect = () => {
  const { titleRef } = useMetadataFormProvider();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const type = useTypeParam();
  const baseRoute = "/create";
  const isCreatePage = pathname === "/create" && !type;
  const isWritingPage = type === "writing";
  const isLinkPage = type === "link";
  const isEmbedPage = type === "embed";

  // Preserve other search params when changing type
  const getUrlWithType = (newType: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newType) {
      params.set("type", newType);
    } else {
      params.delete("type");
    }
    const queryString = params.toString();
    return queryString ? `${baseRoute}?${queryString}` : baseRoute;
  };

  return (
    <div className="h-fit w-full lg:max-w-[250px] xl:max-w-[300px]">
      <div ref={titleRef} className="flex flex-col gap-3 pb-3">
        <CTAButton isActive={isCreatePage} onClick={() => push(getUrlWithType(null))}>
          new moment
        </CTAButton>
        <CTAButton isActive={isWritingPage} onClick={() => push(getUrlWithType("writing"))}>
          new thought
        </CTAButton>
        <CTAButton isActive={isLinkPage} onClick={() => push(getUrlWithType("link"))}>
          new link
        </CTAButton>
        <CTAButton isActive={isEmbedPage} onClick={() => push(getUrlWithType("embed"))}>
          new embed
        </CTAButton>
      </div>
    </div>
  );
};

export default DesktopSelect;
