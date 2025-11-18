import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, CreateFormData } from "@/lib/schema/createFormSchema";
import { useState, useEffect } from "react";
import { useMask } from "./useMask";

const useMomentForm = () => {
  // Metadata values state
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>("usdc");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [previewUri, setPreviewUri] = useState<string>("");
  const [isOpenPreviewUpload, setIsOpenPreviewUpload] = useState<boolean>(false);
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [embedCode, setEmbedCode] = useState("");
  const [link, setLink] = useState<string>("");
  const [writingText, setWritingText] = useState<string>("");

  // Advanced values state
  const [startDate, setStartDate] = useState<Date>();
  const [isOpenAdvanced, setIsOpenAdvanced] = useState<boolean>(false);

  // Mask values state
  const mask = useMask(isOpenAdvanced, writingText);

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
    setDownloadUrl("");
    setPreviewUri("");
    // Revoke previewSrc blob URL before clearing
    if (previewSrc && previewSrc.startsWith("blob:")) {
      URL.revokeObjectURL(previewSrc);
    }
    setPreviewSrc("");
    setEmbedCode("");
    setLink("");
    setWritingText("");
  };

  // Set default price based on priceUnit
  useEffect(() => {
    if (priceUnit === "usdc") {
      setPrice("1");
    } else {
      setPrice("0.000111");
    }
  }, [priceUnit]);

  // React Hook Form
  const form = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name,
      price,
      priceUnit: priceUnit as "eth" | "usdc",
      description: description || undefined,
      startDate: startDate,
      splits: undefined,
    },
    mode: "onChange",
  });

  // Sync form values to state
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name !== undefined) {
        setName(value.name);
      } else if (name === "price" && value.price !== undefined) {
        setPrice(value.price);
      } else if (name === "priceUnit" && value.priceUnit) {
        setPriceUnit(value.priceUnit);
      } else if (name === "description") {
        setDescription(value.description || "");
      } else if (name === "startDate" && value.startDate) {
        setStartDate(value.startDate);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Sync state to form
  useEffect(() => {
    if (form.getValues("name") !== name) {
      form.setValue("name", name, { shouldValidate: false });
    }
  }, [name, form]);

  useEffect(() => {
    if (form.getValues("price") !== price) {
      form.setValue("price", price, { shouldValidate: false });
    }
  }, [price, form]);

  useEffect(() => {
    if (form.getValues("priceUnit") !== priceUnit) {
      form.setValue("priceUnit", priceUnit as "eth" | "usdc", {
        shouldValidate: false,
      });
    }
  }, [priceUnit, form]);

  useEffect(() => {
    const currentDesc = form.getValues("description") || "";
    if (currentDesc !== (description || "")) {
      form.setValue("description", description || undefined, {
        shouldValidate: false,
      });
    }
  }, [description, form]);

  useEffect(() => {
    if (form.getValues("startDate") !== startDate) {
      form.setValue("startDate", startDate, { shouldValidate: false });
    }
  }, [startDate, form]);

  const onChangeStartDate = (value: Date) => setStartDate(value);

  return {
    // Form
    form,

    // Metadata values
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
    setIsTimedSale,
    mimeType,
    setMimeType,
    animationUri,
    setAnimationUri,
    downloadUrl,
    setDownloadUrl,
    previewUri,
    setPreviewUri,
    isOpenPreviewUpload,
    setIsOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
    setWritingText,
    writingText,
    setEmbedCode,
    embedCode,
    setLink,
    link,
    resetForm,

    // Advanced values
    startDate,
    onChangeStartDate,
    isOpenAdvanced,
    setIsOpenAdvanced,

    // Mask values
    ...mask,
  };
};

export default useMomentForm;
