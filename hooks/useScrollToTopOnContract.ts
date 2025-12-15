import { useEffect } from "react";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";

export const useScrollToTopOnContract = (): void => {
  const { createdContract } = useMomentCreateProvider();
  useEffect(() => {
    if (createdContract) {
      const intervalId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [createdContract]);
};
