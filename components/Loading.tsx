import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = ({ className }: { className: string }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <DotLottieReact src="/loading.lottie" loop autoplay />
    </div>
  );
};

export default Loading;
