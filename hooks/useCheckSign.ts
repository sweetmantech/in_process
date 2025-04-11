import useConnectedWallet from "@/hooks/useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useCheckSign = () => {
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { context } = useFrameProvider();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  useEffect(() => {
    if (loaded) {
      if ((context && !address) || (!context && !connectedWallet))
        redirect("/onboarding");
    }
    // eslint-disable-next-line
  }, [loaded, context, address, connectedWallet]);
};

export default useCheckSign;
