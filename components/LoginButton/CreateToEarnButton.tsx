import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";

const CreateToEarnButton = ({ className = "" }: { className?: string }) => {
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();

  return (
    <button
      type="button"
      className={`text-white text-xl md:text-base font-spectral-italic ${className}`}
      onClick={() => {
        toggleNavbar();
        push("/create");
      }}
    >
      create to earn
    </button>
  );
};

export default CreateToEarnButton;
