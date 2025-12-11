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
  const promptIndexRef = useRef(0);
  const [placeholder, setPlaceholder] = useState(promptOptions[0].label);
  const promptRef = useRef(null) as any;

  const rotatePrompt = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      promptIndexRef.current = (promptIndexRef.current + 1) % promptOptions.length;
      setPlaceholder(promptOptions[promptIndexRef.current].label);
    }, 1500);
  };

  useEffect(() => {
    rotatePrompt();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onActive = () => {
    clearInterval(timer);
  };

  return {
    placeholder,
    onActive,
    promptRef,
    rotatePrompt,
  };
};

export default usePrompt;
