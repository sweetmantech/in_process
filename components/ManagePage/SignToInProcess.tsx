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
    <div className="w-screen flex flex-col items-center pt-20 gap-6">
      <p className="font-archivo text-4xl">{`It's time to log into In Process`}</p>
      <button
        type="button"
        onClick={handleSign}
        className="bg-black text-white font-archivo text-xl min-w-[200px] rounded-md py-2"
      >
        sign in
      </button>
    </div>
  );
};

export default SignToInProcess;
