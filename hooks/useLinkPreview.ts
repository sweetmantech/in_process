import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface LinkPreview {
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
}

async function fetchLinkPreview(link: string): Promise<LinkPreview> {
  const response = await fetch(
    `/api/link/get_detail?url=${encodeURIComponent(link)}`,
  );
  if (!response.ok) throw Error("failed to get link preview.");

  const data = await response.json();
  return data;
}

const useLinkPreview = ({ link, setImageUri }: useLinkPreviewProps) => {
  const { data } = useQuery({
    queryKey: ["artist_profile", link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data) {
      setImageUri(data.images?.[0]);
      return;
    }
    setImageUri("");
  }, [data]);
};

export default useLinkPreview;
