import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, CreateFormData } from "@/lib/schema/createFormSchema";
import { useState, useEffect, useRef } from "react";
import { useMask } from "./useMask";
import { useBlobUrls } from "./useBlobUrls";

const useMomentForm = () => {
  // File input ref for resetting file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Metadata values state
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>("usdc");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [mimeType, setMimeType] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [isOpenPreviewUpload, setIsOpenPreviewUpload] = useState<boolean>(false);
  const [embedCode, setEmbedCode] = useState("");
  const [link, setLink] = useState<string>("");
  const [writingText, setWritingText] = useState<string>("");

  // Store File blobs for deferred upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [animationFile, setAnimationFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Blob URLs for preview display
  const { blobUrls, previewFileUrl, animationFileUrl } = useBlobUrls({
    previewFile,
    imageFile,
    animationFile,
    mimeType,
  });

  // Advanced values state
  const [startDate, setStartDate] = useState<Date>();
  const [isOpenAdvanced, setIsOpenAdvanced] = useState<boolean>(false);

  // Mask values state
  const mask = useMask(isOpenAdvanced, writingText);

  const clearMediaState = () => {
    setImageFile(null);
    setAnimationFile(null);
    setPreviewFile(null);
    setMimeType("");
    setDownloadUrl("");
    setEmbedCode("");
    setLink("");
    setWritingText("");
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    clearMediaState();
  };

  /**
   * Reusable function for resetting file uploads while preserving name and description.
   * Used in both Create and Manage flows.
   */
  const resetFiles = () => {
    // Store current form values BEFORE any operations (preserve name and description)
    const currentName = form.getValues("name");
    const currentDescription = form.getValues("description");

    // Clear only files and media-related state, NOT name/description
    clearMediaState();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Ensure form values remain unchanged (preserve name and description)
    if (currentName !== undefined && currentName !== null) {
      form.setValue("name", currentName, { shouldValidate: false });
    }
    if (currentDescription !== undefined && currentDescription !== null) {
      form.setValue("description", currentDescription, { shouldValidate: false });
    }
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

  // Check if any media files are selected
  const hasMedia = Boolean(previewFile || imageFile || animationFile);

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
    description,
    setDescription,
    isTimedSale,
    setIsTimedSale,
    mimeType,
    setMimeType,
    downloadUrl,
    setDownloadUrl,
    isOpenPreviewUpload,
    setIsOpenPreviewUpload,
    setWritingText,
    writingText,
    setEmbedCode,
    embedCode,
    setLink,
    link,
    resetForm,
    resetFiles,

    // Advanced values
    startDate,
    onChangeStartDate,
    isOpenAdvanced,
    setIsOpenAdvanced,

    // Mask values
    ...mask,

    // File blobs for deferred upload
    imageFile,
    setImageFile,
    animationFile,
    setAnimationFile,
    previewFile,
    setPreviewFile,

    // Media state
    hasMedia,

    // Blob URLs for preview display
    blobUrls,
    // Legacy blob URLs for backward compatibility
    previewFileUrl,
    animationFileUrl,

    // Upload progress
    uploadProgress,
    setUploadProgress,
    isUploading,
    setIsUploading,

    // File input ref
    fileInputRef,
  };
};

export default useMomentForm;
