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
  link: string;
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
  link,
  setImageUri,
  setFileUploading,
  setName,
  setDescription,
  setMimeType,
}: useLinkPreviewProps) => {
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
        const response = await fetch(
          `/api/arweave/url?url=${encodeURIComponent(data.images?.[0] || data.favicons?.[0])}`,
        );
        const url = await response.json();
        setImageUri(url.uri);
        setMimeType(url.type);
        setFileUploading(false);
      }
      return;
    };
    uploadImage();
    setImageUri("");
  }, [data]);
};

export default useLinkPreview;
