"use client";

import { ArrowRight } from "@/components/ui/icons";
import { useRouter, usePathname } from "next/navigation";

interface NavButtonProps {
  label: string;
  href: string;
}

const NavButton = ({ label, href }: NavButtonProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      type="button"
      className={`flex shrink-0 items-center justify-center rounded-full px-3 h-fit py-1.5 font-archivo-medium text-xs transition-colors md:w-full md:justify-between md:rounded-md md:px-4 md:py-1 md:text-2xl ${
        isActive ? "bg-grey-moss-900 text-grey-eggshell" : "hover:bg-grey-eggshell"
      }`}
      onClick={() => push(href)}
    >
      <p className="whitespace-nowrap md:text-2xl">{label}</p>
      <ArrowRight className={`hidden size-4 md:block ${isActive ? "text-grey-eggshell" : ""}`} />
    </button>
  );
};

export default NavButton;
