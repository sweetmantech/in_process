import truncated from "@/lib/truncated";
import { useMomentProvider } from "@/providers/MomentProvider";

const Title = () => {
  const { metadata } = useMomentProvider();
  if (!metadata) return null;

  return <h3 className="font-spectral text-3xl md:text-4xl">{truncated(metadata.name, 100)}</h3>;
};

export default Title;
