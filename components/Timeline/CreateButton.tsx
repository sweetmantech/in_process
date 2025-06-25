import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateButton = () => {
  const { push } = useRouter();
  return (
    <Button
      className="md:mt-2 bg-grey-eggshell hover:bg-grey-moss-100 md:bg-white md:border md:border-black text-black font-archivo text-lg md:text-[22px] py-3 md:py-6 px-12 md:px-24 rounded-sm"
      onClick={() => push("/create")}
    >
      create
    </Button>
  );
};

export default CreateButton;
