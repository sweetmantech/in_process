import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import TextInput from "./TextInput";

const TextCreation = () => {
  const { createdTokenId } = useMomentCreateProvider();

  return (
    <div className={`size-full ${createdTokenId && "pointer-events-none"}`}>
      <TextInput />
    </div>
  );
};

export default TextCreation;
