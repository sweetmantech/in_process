import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CTAButton from "./CTAButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DesktopSelect = () => {
  const { titleRef } = useZoraCreateProvider();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const urlParams = searchParams.toString();
  const baseRoute = "/create";
  const isCreatePage = pathname === "/create";
  const isWritingPage = pathname === "/create/writing";
  const isLinkPage = pathname === "/create/link";
  const isEmbedPage = pathname === "/create/embed";
  const urlQuery = urlParams ? `?${urlParams}` : "";
  return (
    <div className="w-full lg:max-w-[250px] xl:max-w-[300px] h-fit">
      <div ref={titleRef} className="flex flex-col gap-3 pb-3">
        <CTAButton
          isActive={isCreatePage}
          onClick={() => push(`${baseRoute}${urlQuery}`)}
        >
          new moment
        </CTAButton>
        <CTAButton
          isActive={isWritingPage}
          onClick={() => push(`${baseRoute}/writing${urlQuery}`)}
        >
          new thought
        </CTAButton>
        <CTAButton
          isActive={isLinkPage}
          onClick={() => push(`${baseRoute}/link${urlQuery}`)}
        >
          new link
        </CTAButton>
        <CTAButton
          isActive={isEmbedPage}
          onClick={() => push(`${baseRoute}/embed${urlQuery}`)}
        >
          new embed
        </CTAButton>
      </div>
    </div>
  );
};

export default DesktopSelect;
