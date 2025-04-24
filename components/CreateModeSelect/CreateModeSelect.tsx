"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import CTAButton from "./CTAButton";
import { usePathname, useRouter } from "next/navigation";

const CreateModeSelect = () => {
  const { titleRef } = useZoraCreateProvider();
  const pathname = usePathname();
  const { push } = useRouter();

  const isCreatePage = pathname === "/create";
  const isWritingPage = pathname === "/create/writing";
  const isLinkPage = pathname === "/create/link";
  const isEmbedPage = pathname === "/create/embed";

  return (
    <div className="col-span-1">
      <div className="w-full lg:max-w-[250px] xl:max-w-[300px] h-fit">
        <div ref={titleRef} className="flex flex-col gap-3">
          <CTAButton isActive={isCreatePage} onClick={() => push("/create")}>
            new moment
          </CTAButton>
          <CTAButton
            isActive={isWritingPage}
            onClick={() => push("/create/writing")}
          >
            new thought
          </CTAButton>
          <CTAButton isActive={isLinkPage} onClick={() => push("/create/link")}>
            new link
          </CTAButton>
          <CTAButton
            isActive={isEmbedPage}
            onClick={() => push("/create/embed")}
          >
            new embed
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default CreateModeSelect;
