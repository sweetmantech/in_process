import useShareMoment from "@/hooks/useShareMoment";

const ShareButton = () => {
  const { share } = useShareMoment();

  return (
    <button
      type="button"
      onClick={share}
      className="rounded-sm border border-grey-moss-900 bg-white px-2"
      aria-label="Share moment"
    >
      copy link
    </button>
  );
};

export default ShareButton;
