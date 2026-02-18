import { useMediaQuery } from "usehooks-ts";

const useIsMobile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)", {
    defaultValue: false,
    initializeWithValue: false,
  });

  return isMobile;
};

export default useIsMobile;
