import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface ImagePosition {
  x: number;
  y: number;
}

const useMetadataValues = () => {
  const pathname = usePathname();
  const isUsdc = pathname.includes("/usdc");

  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>(isUsdc ? "usdc" : "eth");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const [previewUri, setPreviewUri] = useState<string>("");
  const [isEditingPreview, setIsEditingPreview] = useState<boolean>(false);
  const [isOpenPreviewUpload, setIsOpenPreviewUpload] =
    useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  
  // Image repositioning state
  const [imagePosition, setImagePosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState<number>(1);

  useEffect(() => {
    if (priceUnit === "usdc") {
      setPrice("1");
    } else {
      setPrice("0.000111");
    }
  }, [priceUnit]);

  return {
    name,
    setName,
    priceUnit,
    setPriceUnit,
    price,
    setPrice,
    imageUri,
    setImageUri,
    description,
    setDescription,
    isTimedSale,
    mimeType,
    setMimeType,
    animationUri,
    setAnimationUri,
    setIsTimedSale,
    previewUri,
    setPreviewUri,
    isEditingPreview,
    setIsEditingPreview,
    setIsOpenPreviewUpload,
    isOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
    imagePosition,
    setImagePosition,
    imageScale,
    setImageScale,
  };
};

export default useMetadataValues;
