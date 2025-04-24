"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CTAButton from "./CTAButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CreatedMoment from "../CreatedMoment/CreatedMoment";

const CreateModeSelect = () => {
  const { titleRef, createdContract } = useZoraCreateProvider();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const urlParams = searchParams.toString();
  const isCreatePage = pathname === "/create";
  const isWritingPage = pathname === "/create/writing";
  const isLinkPage = pathname === "/create/link";
  const isEmbedPage = pathname === "/create/embed";
  const urlQuery = urlParams ? `?${urlParams}` : "";

  return (
    <div className="col-span-1">
      {createdContract ? (
        <CreatedMoment />
      ) : (
        <div className="w-full lg:max-w-[250px] xl:max-w-[300px] h-fit">
          <div ref={titleRef} className="flex flex-col gap-3 pb-3">
            <CTAButton
              isActive={isCreatePage}
              onClick={() => push(`/create${urlQuery}`)}
            >
              new moment
            </CTAButton>
            <CTAButton
              isActive={isWritingPage}
              onClick={() => push(`/create/writing${urlQuery}`)}
            >
              new thought
            </CTAButton>
            <CTAButton
              isActive={isLinkPage}
              onClick={() => push(`/create/link${urlQuery}`)}
            >
              new link
            </CTAButton>
            <CTAButton
              isActive={isEmbedPage}
              onClick={() => push(`/create/embed${urlQuery}`)}
            >
              new embed
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModeSelect;
