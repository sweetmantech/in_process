import { useAirdropProvider } from "@/providers/AirdropProvider";
import { Fragment } from "react";
import { isAddress } from "viem";
import AirdropButton from "./AirdropButton";

const Airdrop = () => {
  const { walletAddresses, onChangeAddress } = useAirdropProvider();

  return (
    <div className="pt-4 px-4 md:px-10 w-full flex flex-col gap-2">
      {walletAddresses.map((wallet: string, i) => (
        <Fragment key={i}>
          {isAddress(wallet) ? (
            <p className="font-archivo text-xs md:text-lg bg-grey-moss-300 w-fit text-white p-2 rounded-md">
              {wallet}
            </p>
          ) : (
            <input
              type="text"
              className="w-fit p-2 rounded-md !outline-none !ring-0 text-xs md:text-lg"
              onChange={(e) => onChangeAddress(e.target.value, i)}
            />
          )}
        </Fragment>
      ))}
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="bg-black text-white font-archivo px-3 py-1 rounded-md w-fit disabled:bg-grey-moss-300 disabled:cursor-not-allowed"
          disabled={Boolean(
            walletAddresses.filter((wallet: string) => !isAddress(wallet))
              .length,
          )}
          onClick={() => onChangeAddress("", walletAddresses.length)}
        >
          + Wallet
        </button>
        <AirdropButton />
      </div>
    </div>
  );
};

export default Airdrop;
