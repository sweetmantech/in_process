import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
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
  setPreviewUri: Dispatch<SetStateAction<string>>;
  setPreviewSrc: Dispatch<SetStateAction<string>>;
}

async function fetchLinkPreview(link: string): Promise<LinkPreview> {
  const response = await fetch(`/api/link/get_detail?url=${encodeURIComponent(link)}`);
  if (!response.ok) throw Error("failed to get link preview.");

  const data = await response.json();
  return data;
}

async function fetchBlob(link: string): Promise<File> {
  const response = await fetch(`/api/link/get_blob?url=${encodeURIComponent(link)}`);
  const type = response.headers.get("content-type") || "";
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type });
  const file = new File([blob], "uploadedFile", { type });
  return file;
}

const useLinkPreview = ({
  setImageUri,
  setPreviewUri,
  setFileUploading,
  setPreviewSrc,
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
        try {
          setFileUploading(true);
          const file = await fetchBlob(data.images?.[0] || data.favicons?.[0]);
          const uri = await clientUploadToArweave(file);
          setPreviewSrc(URL.createObjectURL(file));
          setPreviewUri(uri);
          setFileUploading(false);
        } catch (error) {
          console.error(error);
          setFileUploading(false);
        }
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
