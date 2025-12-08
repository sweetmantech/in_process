import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

export interface LinkPreview {
  siteName: string;
  title: string;
  description: string;
  url: string;
  images: string[];
  favicons: string[];
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

const useLinkPreview = () => {
  const { setPreviewFile, link } = useMetadataFormProvider();

  const { data } = useQuery({
    queryKey: ["link_preview", link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  });

  useEffect(() => {
    // TODO: Centralize upload+preview logic with handleImageSelection helper to avoid duplication
    // Note: This flow differs slightly as it fetches blob from URL first, then uploads
    const uploadImage = async () => {
      if (!data) return;
      if (data.images?.[0] || data.favicons?.[0]) {
        try {
          const file = await fetchBlob(data.images?.[0] || data.favicons?.[0]);
          setPreviewFile(file);
        } catch (error) {
          console.error(error);
        }
      }
      return;
    };
    uploadImage();
  }, [data, setPreviewFile]);
};

export default useLinkPreview;
