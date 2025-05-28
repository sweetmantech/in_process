import useTotalEarnings from "@/hooks/useTotalEarnings";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const CreateToEarnButton = ({ className = "" }: { className?: string }) => {
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();
  const { totalAmount } = useTotalEarnings();
  const { isLoading } = useUserCollectionsProvider();

  if (totalAmount > 0 || isLoading) return <Fragment />;
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
