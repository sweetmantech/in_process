import { useFrameProvider } from "@/providers/FrameProvider";
import { config } from "@/providers/WagmiProvider";
import { usePrivy } from "@privy-io/react-auth";
import { useConnect } from "wagmi";

const SignToInProcess = () => {
  const { connect } = useConnect();
  const { context } = useFrameProvider();
  const { login } = usePrivy();

  const handleSign = () => {
    if (context) {
      connect({
        connector: config.connectors[0],
      });
      return;
    }

    login();
  };
  return (
    <div className="flex w-screen flex-col items-center gap-6 pt-20">
      <p className="font-archivo text-4xl">{`It's time to log into In Process`}</p>
      <button
        type="button"
        onClick={handleSign}
        className="min-w-[200px] rounded-md bg-black py-2 font-archivo text-xl text-white"
      >
        sign in
      </button>
    </div>
  );
};

export default SignToInProcess;
