import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateButton = () => {
  const { push } = useRouter();
  return (
    <Button
      className="md:mt-2 bg-white hover:bg-grey-moss-100 text-black border border-black font-archivo text-xl md:text-[22px] py-4 md:py-6 px-16 md:px-24 rounded-sm"
      onClick={() => push("/create")}
    >
      create
    </Button>
  );
};

export default CreateButton;
