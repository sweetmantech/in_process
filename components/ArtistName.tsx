import truncateAddress from "@/lib/truncateAddress";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Address } from "viem";

interface ArtistNameProps {
  className?: string;
  address: Address;
}
const ArtistName: FC<ArtistNameProps> = ({ className = "", address }) => {
  const [ref, inView] = useInView();
  const [intialized, setInitialized] = useState(false);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (intialized) return;
      if (inView) {
        setInitialized(true);
        const response = await fetch(`/api/profile?walletAddress=${address}`);
        const data = await response.json();
        setUserName(data.username);
        return;
      }
      setUserName("");
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [inView, intialized]);

  return (
    <p className={`${className}`} ref={ref}>
      {username || truncateAddress(address)}
    </p>
  );
};

export default ArtistName;
