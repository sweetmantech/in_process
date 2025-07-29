import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [previewScale, setPreviewScale] = useState<number>(1);

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
    previewPosition,
    setPreviewPosition,
    previewScale,
    setPreviewScale,
  };
};

export default useMetadataValues;
