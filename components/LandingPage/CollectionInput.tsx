import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function CollectionInput() {
  const [collectionAddress, setCollectionAddress] = useState("");

  const parseZoraUrl = (url: string) => {
    try {
      // Handle both URLs and direct chain:address formats
      if (url.includes("zora.co/collect/")) {
        const match = url.match(/collect\/([\w]+):([^/?]+)/);
        if (match) {
          return `${match[1]}:${match[2]}`; // Returns "chain:address" format
        }
      }
      return url; // Return as-is if it's already in chain:address format
    } catch (error) {
      return url;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (collectionAddress) {
        const parsedAddress = parseZoraUrl(collectionAddress);
        console.log("parsedAddress", parsedAddress);
        window.open(`/collect/${parsedAddress}`, "_blank");
        setCollectionAddress(""); // Clear input after submission
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
