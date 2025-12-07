import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateButton = () => {
  const { push } = useRouter();
  return (
    <Button
      className="rounded-sm !bg-grey-eggshell px-12 py-3 font-archivo text-lg text-black hover:!bg-grey-moss-100 md:mt-2 md:px-16 md:py-4 md:text-xl"
      onClick={() => push("/create")}
    >
      create
    </Button>
  );
};

export default CreateButton;
