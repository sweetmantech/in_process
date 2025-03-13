import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface LinkPreview {
  siteName: string;
  title: string;
  description: string;
  url: string;
  images: string[];
  favicons: string[];
}

async function fetchLinkPreview(link: string): Promise<LinkPreview> {
  const response = await fetch(
    `/api/link/get_detail?url=${encodeURIComponent(link)}`,
  );
  if (!response.ok) throw Error("failed to get link preview.");

  const data = await response.json();
  return data;
}

const useLinkPreview = () => {
  const [link, setLink] = useState<string>("");
  const fetchQuery = useQuery({
    queryKey: ["artist_profile", link],
    queryFn: () => fetchLinkPreview(link),
    staleTime: 1000 * 60 * 5,
    enabled: !!link,
    refetchOnMount: true,
  });

  return {
    link,
    setLink,
    fetchQuery,
  };
};

export default useLinkPreview;
