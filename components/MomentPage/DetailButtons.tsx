import useBalanceOf from "@/hooks/useBalanceOf";
import DownloadButton from "./DownloadButton";
import ShareButton from "./ShareButton";

const DetailButtons = () => {
  const { balanceOf } = useBalanceOf();

  return (
    <div className="mt-2 flex items-center gap-2">
      <ShareButton />
      {balanceOf > 0 && <DownloadButton />}
    </div>
  );
};

export default DetailButtons;
