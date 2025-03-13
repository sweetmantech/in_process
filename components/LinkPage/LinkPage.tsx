import useLinkPreview from "@/hooks/useLinkPreview";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const LinkPage = () => {
  const { fetchQuery, link, setLink } = useLinkPreview();
  const { isLoading, data } = fetchQuery;

  if (isLoading) return <Skeleton className="w-[300px] aspect-[1/1]" />;

  return (
    <main className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      {data && (
        <>
          <div className="w-[300px] aspect-[1/1] relative">
            <Image
              src={data?.images?.[0] || ""}
              alt="not found preview image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <p>{data.title}</p>
          <p>{data.description}</p>
        </>
      )}
    </main>
  );
};

export default LinkPage;
