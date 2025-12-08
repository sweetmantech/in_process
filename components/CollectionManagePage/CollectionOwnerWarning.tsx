"use client";
import useCollectionData from "@/hooks/useCollectionData";

const CollectionOwnerWarning = () => {
  const { isOwner } = useCollectionData();

  if (isOwner) return null;

  return <p className="text-grey-moss-500 text-xs">Only the collection owner can save changes.</p>;
};

export default CollectionOwnerWarning;
