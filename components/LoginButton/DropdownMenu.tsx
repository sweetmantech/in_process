import useSignedAddress from "@/hooks/useSignedAddress";
import { useFrameProvider } from "@/providers/FrameProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateToEarnButton from "./CreateToEarnButton";
import Divider from "./Divider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import TotalEarnings from "./TotalEarnings";
import { usePrivy } from "@privy-io/react-auth";

export function DropdownMenu() {
  const { context } = useFrameProvider();
  const { push } = useRouter();
  const signedAddress = useSignedAddress();
  const { toggleNavbar } = useLayoutProvider();
  const { logout } = usePrivy();

  return (
    <div className="absolute top-full left-0 right-0 h-screen md:h-fit bg-grey-moss-900 shadow-lg font-archivo z-[999999999] rounded-b-sm border-t-0">
      <Divider />
      <div className="px-6 md:px-4 py-4 md:py-2">
        <div className="flex gap-2 items-start md:justify-between md:items-center">
          <Image
            src="/images/dropdown-ellipse.svg"
            alt="Dropdown indicator"
            width={32}
            height={32}
            className="block md:hidden"
          />
          <div className="text-white w-full">
            <p className="font-archivo text-2xl md:text-base">total earnings</p>
            <div className="block md:hidden flex items-center justify-between w-full">
              <TotalEarnings className="block md:hidden" />
              <CreateToEarnButton className="block md:hidden" />
            </div>
          </div>
          <Image
            src="/images/dropdown-ellipse.svg"
            alt="Dropdown indicator"
            width={24}
            height={24}
            className="hidden md:block"
          />
        </div>
        <div className="flex justify-between pt-2">
          <TotalEarnings className="hidden md:block" />
          <CreateToEarnButton className="hidden md:block" />
        </div>
      </div>
      <Divider />
      <button
        onClick={() => {
          toggleNavbar();
          push(`/${signedAddress}`);
        }}
        className="w-full text-left pl-14 md:px-4 py-4 md:py-2 text-white text-2xl md:text-base hover:bg-[#333333] hover:rounded-b-sm transition-colors"
      >
        timeline
      </button>
      <Divider />
      <button
        onClick={() => {
          toggleNavbar();
          push("/manage");
        }}
        className="w-full text-left pl-14 md:px-4 py-4 md:py-2 text-white text-2xl md:text-base hover:bg-[#333333] hover:rounded-b-sm transition-colors"
      >
        manage
      </button>
      {!context && (
        <>
          <Divider />
          <button
            onClick={() => {
              toggleNavbar();
              logout();
            }}
            className="w-full text-left pl-14 md:px-4 py-4 md:py-2 text-white text-2xl md:text-base hover:bg-[#333333] hover:rounded-b-sm transition-colors"
          >
            log out
          </button>
        </>
      )}
      <Image
        src="/spiral.svg"
        blurDataURL="/spiral.png"
        alt="not found spiral"
        width={440}
        height={546}
        className="block md:hidden"
      />
    </div>
  );
}
