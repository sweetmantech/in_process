import { useState, useEffect } from "react";

const useMetadataValues = () => {
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>("usdc");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const [previewUri, setPreviewUri] = useState<string>("");
  const [isOpenPreviewUpload, setIsOpenPreviewUpload] =
    useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>("");

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
    setIsOpenPreviewUpload,
    isOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
  };
};

export default useMetadataValues;
