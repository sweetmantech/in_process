import { ArrowRight } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

const MutualMomentsButton = () => {
  const { push } = useRouter();
  return (
    <button
      type="button"
      className="flex items-center justify-between w-full font-archivo-medium text-2xl hover:bg-grey-eggshell px-2 py-1 rounded-md"
      onClick={() => push("/manage/mutual-moments")}
    >
      <p className="text-base md:text-2xl">mutual moments</p>
      <ArrowRight className="size-4" />
    </button>
  );
};

export default MutualMomentsButton;
