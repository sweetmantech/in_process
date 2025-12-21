import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export const useDelayedReady = () => {
  const { ready } = usePrivy();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [ready]);
  return loaded;
};
