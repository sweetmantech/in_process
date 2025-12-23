import { AirdropItem } from "@/types/airdrop";
import resolveAddressForAirdrop from "@/lib/ens/resolveAddressForAirdrop";

interface ProcessAirdropItemsResult {
  finalItems: AirdropItem[];
  validItems: AirdropItem[];
}

export const processAirdropItems = async (
  airdropToItems: AirdropItem[]
): Promise<ProcessAirdropItemsResult> => {
  // Separate items into those that need resolution and those that are already valid
  const itemsNeedingResolution: Array<{ item: AirdropItem; originalIndex: number }> = [];
  const alreadyValidItems: AirdropItem[] = [];

  airdropToItems.forEach((item, index) => {
    if (item.status === "validating" || (item.status === "valid" && !item.address)) {
      // Item needs resolution - preserve original index for mapping
      itemsNeedingResolution.push({ item, originalIndex: index });
    } else if (item.status === "valid" && item.address) {
      // Item is already valid - keep as is
      alreadyValidItems.push(item);
    }
  });

  // Resolve each item individually (preserve duplicates)
  const resolvedItems = await Promise.all(
    itemsNeedingResolution.map(({ item }) =>
      item.ensName ? resolveAddressForAirdrop(item.ensName) : Promise.resolve(item)
    )
  );

  // Build the final array preserving original order and duplicates
  // Start with already valid items, then merge resolved items at their original positions
  const finalItems: AirdropItem[] = [...airdropToItems];

  // Update items that were resolved, preserving their original positions
  itemsNeedingResolution.forEach(({ originalIndex }, resolvedIndex) => {
    finalItems[originalIndex] = resolvedItems[resolvedIndex];
  });

  // Filter out invalid items for airdrop execution
  const validItems = finalItems.filter((item) => item.status === "valid" && item.address);

  return {
    finalItems,
    validItems,
  };
};
