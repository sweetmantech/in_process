import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useEffect, useState } from "react";

const promptOptions = [
  { label: "this is the time when...", value: "this is the time when " },
  { label: "today i...", value: "today i " },
  { label: "yesterday i...", value: "yesterday i " },
  { label: "i...", value: "i " },
  { label: "write anything", value: "write anything " },
];

let timer: NodeJS.Timeout | string | number | undefined = undefined;
const usePrompt = () => {
  const [prompt, setPrompt] = useState(0);
  const [placeholder, setPlaceholder] = useState(promptOptions[0].label);
  const { name, setName } = useZoraCreateProvider();

  const rotatePrompt = () => {
    clearInterval(timer);
    timer = setInterval(
      () =>
        setPrompt((prev) => {
          const promptIndex = (prev + 1) % promptOptions.length;
          setPlaceholder(promptOptions[promptIndex].label);
          return promptIndex;
        }),
      1500,
    );
  };

  const onActive = () => {
    clearInterval(timer);
    if (name) return;
    setName(promptOptions[prompt].value);
  };

  useEffect(() => {
    if (!name) rotatePrompt();
  }, [name]);

  return {
    placeholder,
    onActive,
  };
};

export default usePrompt;
