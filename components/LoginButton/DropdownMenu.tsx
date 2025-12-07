import { useFrameProvider } from "@/providers/FrameProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Divider from "./Divider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { usePrivy } from "@privy-io/react-auth";
import { useUserProvider } from "@/providers/UserProvider";

export function DropdownMenu() {
  const { context } = useFrameProvider();
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();
  const { logout } = usePrivy();
  const { artistWallet } = useUserProvider();

  return (
    <div className="fixed left-0 right-0 top-[100px] z-[999999999] h-screen rounded-b-sm border-t-0 bg-grey-moss-900 font-archivo shadow-lg md:absolute md:top-full md:h-fit">
      <Divider />
      <button
        onClick={() => {
          toggleNavbar();
          push(`/${artistWallet}`);
        }}
        className="w-full py-4 pl-14 text-left text-2xl text-white transition-colors hover:rounded-b-sm hover:bg-[#333333] md:px-4 md:py-2 md:text-base"
      >
        timeline
      </button>
      <Divider />
      <button
        onClick={() => {
          toggleNavbar();
          push("/manage");
        }}
        className="w-full py-4 pl-14 text-left text-2xl text-white transition-colors hover:rounded-b-sm hover:bg-[#333333] md:px-4 md:py-2 md:text-base"
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
            className="w-full py-4 pl-14 text-left text-2xl text-white transition-colors hover:rounded-b-sm hover:bg-[#333333] md:px-4 md:py-2 md:text-base"
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
