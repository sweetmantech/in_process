import truncateAddress from "@/lib/truncateAddress";
import getEnsName from "@/lib/viem/getEnsName";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Address } from "viem";

interface EnsNameProps {
  className?: string;
  address: Address;
}
const EnsName: FC<EnsNameProps> = ({ className = "", address }) => {
  const [ref, inView] = useInView();

  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    const fetchEnsname = async () => {
      if (address && inView) {
        const response = await getEnsName(address);
        setEnsName(response);
        return;
      }

      setEnsName("");
    };
    fetchEnsname();
  }, [address, inView]);

  return (
    <p className={`${className}`} ref={ref}>
      {ensName || truncateAddress(address)}
    </p>
  );
};

export default EnsName;
