import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import TextInput from "./TextInput";

const TextCreation = () => {
  const { createdContract } = useZoraCreateProvider();

  return (
    <div
      className={`w-full min-[1220px]:max-w-[450px] xl:max-w-[500px] aspect-[576/700] relative bg-[url('/sky.png')] bg-cover ${createdContract && "pointer-events-none"}`}
    >
      <TextInput />
    </div>
  );
};

export default TextCreation;
