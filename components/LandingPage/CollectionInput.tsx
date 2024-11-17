import { Input } from "@/components/ui/Input";
import parseZoraUrl from "@/lib/zora/parseZoraUrl";
import { useState } from "react";

export default function CollectionInput() {
  const [collectionAddress, setCollectionAddress] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (collectionAddress) {
        const parsedAddress = parseZoraUrl(collectionAddress);
        window.open(`/collect/${parsedAddress}`, "_blank");
        setCollectionAddress("");
      }
    }
  };

  return (
    <Input
      type="text"
      placeholder="Enter Zora collection URL or address..."
      value={collectionAddress}
      onChange={(e) => setCollectionAddress(e.target.value)}
      onKeyDown={handleKeyPress}
      className="max-w-4xl w-full"
    />
  );
}
