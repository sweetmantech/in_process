import { useEffect, useState } from "react";

/** Avoids SSR / hydration mismatches for browser-only APIs (WebGL, etc.). */
export const useHasMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
