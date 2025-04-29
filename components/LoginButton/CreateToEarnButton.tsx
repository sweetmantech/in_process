import { useRouter } from "next/navigation";

const CreateToEarnButton = ({ className = "" }: { className?: string }) => {
  const { push } = useRouter();

  return (
    <button
      type="button"
      className={`text-white text-xl md:text-base font-spectral-italic ${className}`}
      onClick={() => push("/create")}
    >
      create to earn
    </button>
  );
};

export default CreateToEarnButton;
