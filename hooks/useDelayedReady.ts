import { useEffect, useState } from "react";

export const useDelayedReady = (ready: boolean, delayMs = 1000) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setLoaded(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [ready, delayMs]);
  return loaded;
};
