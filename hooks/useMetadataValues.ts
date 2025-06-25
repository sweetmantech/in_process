import { useEffect, useState } from "react";

type Currency = "ETH" | "USD";

const useMetadataValues = (selectedCurrency?: Currency) => {
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>(
    selectedCurrency === "USD" ? "usdc" : "eth"
  );

  // Update priceUnit when selectedCurrency changes
  useEffect(() => {
    setPriceUnit(selectedCurrency === "USD" ? "usdc" : "eth");
  }, [selectedCurrency]);
  const [price, setPrice] = useState("0");
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
  };
};

export default useMetadataValues;
