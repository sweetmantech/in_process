import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";
import { useEffect, useRef, useState } from "react";

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
  const { name, setName } = useMomentCreateFormProvider();
  const promptRef = useRef() as any;

  const rotatePrompt = () => {
    clearInterval(timer);
    timer = setInterval(
      () =>
        setPrompt((prev) => {
          const promptIndex = (prev + 1) % promptOptions.length;
          setPlaceholder(promptOptions[promptIndex].label);
          return promptIndex;
        }),
      1500
    );
  };

  const onActive = () => {
    if (name) return;

    const promptValue = promptOptions[prompt].value;
    setName(promptValue);
    setTimeout(() => {
      promptRef.current.setSelectionRange(promptValue.length, promptValue.length);
    }, 100);
    clearInterval(timer);
  };

  useEffect(() => {
    if (!name) rotatePrompt();
  }, [name]);

  return {
    placeholder,
    onActive,
    promptRef,
  };
};

export default usePrompt;
