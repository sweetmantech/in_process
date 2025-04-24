import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import getBlob from "@/lib/getBlob";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface LinkPreview {
  siteName: string;
  title: string;
  description: string;
  url: string;
  images: string[];
  favicons: string[];
}

interface useLinkPreviewProps {
  setImageUri: Dispatch<SetStateAction<string>>;
  setFileUploading: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setMimeType: Dispatch<SetStateAction<string>>;
}

async function fetchLinkPreview(link: string): Promise<LinkPreview> {
  const response = await fetch(
    `/api/link/get_detail?url=${encodeURIComponent(link)}`,
  );
  if (!response.ok) throw Error("failed to get link preview.");

  const data = await response.json();
  return data;
}

const useLinkPreview = ({
  setImageUri,
  setFileUploading,
  setName,
  setDescription,
  setMimeType,
}: useLinkPreviewProps) => {
  const [link, setLink] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["link_preview", link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  });

  useEffect(() => {
    const uploadImage = async () => {
      if (!data) return;
      if (data.images?.[0] || data.favicons?.[0]) {
        setName(data.title);
        setDescription(data.description);
        setFileUploading(true);
        const { blob, type } = await getBlob(
          data.images?.[0] || data.favicons?.[0],
        );
        const file = new File([blob], "uploadedFile", { type });
        const uri = await clientUploadToArweave(file);
        setImageUri(uri);
        setMimeType(type);
        setFileUploading(false);
      }
      return;
    };
    uploadImage();
    setImageUri("");
  }, [data]);

  return {
    link,
    setLink,
  };
};

export default useLinkPreview;
