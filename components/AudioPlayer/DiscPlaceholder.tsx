import { useAudioProvider } from ".";

const DiscPlaceholder = () => {
  const { state } = useAudioProvider();
  const { isPlaying } = state;

  return (
    <div
      className={`relative size-full rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-2xl ${
        isPlaying ? "animate-spin" : ""
      }`}
      style={{ animationDuration: "3s" }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-neutral-700/50 sm:border-4" />

      {/* Vinyl grooves - percentage based for mobile */}
      <div className="absolute inset-[5%] rounded-full border border-neutral-600/30" />
      <div className="absolute inset-[12%] rounded-full border border-neutral-600/20" />
      <div className="absolute inset-[19%] rounded-full border border-neutral-600/30" />
      <div className="absolute inset-[26%] rounded-full border border-neutral-600/20" />

      {/* Label area */}
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-700 shadow-inner">
        {/* Label shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent" />

        {/* Center hole */}
        <div className="absolute inset-[40%] rounded-full bg-neutral-900 shadow-inner" />
      </div>

      {/* Reflection/shine effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default DiscPlaceholder;
