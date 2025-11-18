import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import TextInput from "./TextInput";

const TextCreation = () => {
  const { createdContract } = useMomentCreateProvider();

  return (
    <div className={`size-full ${createdContract && "pointer-events-none"}`}>
      <TextInput />
    </div>
  );
};

export default TextCreation;
