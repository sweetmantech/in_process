import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateButton = () => {
  const { push } = useRouter();
  return (
    <Button
      className="md:mt-2 !bg-grey-eggshell hover:!bg-grey-moss-100 text-black font-archivo text-lg md:text-xl py-3 md:py-4 px-12 md:px-16 rounded-sm"
      onClick={() => push("/create")}
    >
      create
    </Button>
  );
};

export default CreateButton;
