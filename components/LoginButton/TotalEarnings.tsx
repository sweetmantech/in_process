import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";

const TotalEarnings = ({ className }: { className: string }) => {
  const { data, isLoading } = useUserCollectionsProvider();
  return (
    <p className={`text-white md:text-base font-spectral text-xl ${className}`}>
      {isLoading ? "__" : `${data?.totalEarnings} ETH`}
    </p>
  );
};

export default TotalEarnings;
