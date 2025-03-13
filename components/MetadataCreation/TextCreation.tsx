import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import TextInput from "./TextInput";

const TextCreation = () => {
  const { createdContract } = useZoraCreateProvider();

  return (
    <div
      className={`size-full relative bg-[url('/sky.png')] bg-cover ${createdContract && "pointer-events-none"}`}
    >
      <TextInput />
    </div>
  );
};

export default TextCreation;
