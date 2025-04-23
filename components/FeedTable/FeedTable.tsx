"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useFeedTable from "@/hooks/useFeedTable";
import { useRouter } from "next/navigation";
import { Address } from "viem";
import DescriptionCell from "./DescriptionCell";
import ArtistName from "../ArtistName";
import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import Loading from "../Loading";

export default function FeedTable() {
  const { feeds, fetchMore, hasMoreT } = useInProcessFeedProvider();
  const table = useFeedTable();
  const { push } = useRouter();
  const fontFamilies = ["font-archivo", "font-spectral-italic", "font-archivo"];
  const fontSizes = [
    "text-sm md:text-xl",
    "text-sm md:text-lg",
    "text-sm md:text-md",
  ];

  const handleClick = (index: number) => {
    push(`/${feeds[index].creator}`);
  };

  return (
    <div className="w-full">
      <div className="rounded-md overflow-auto md:max-h-[88vh] no-scrollbar">
        <Table>
          <TableBody>
            {table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                className="!border-transparent hover:!bg-transparent hover:!text-grey-moss-300 hover:!border-grey-moss-300 hover:!border-b"
                onClick={() => handleClick(i)}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    className={`md:py-3 border-none cursor-pointer ${fontFamilies[i]} ${fontSizes[i]}`}
                  >
                    {cell.id.includes("creator") ? (
                      <ArtistName
                        address={cell.getValue() as Address}
                        className="!font-archivo-medium"
                      />
                    ) : (
                      <>
                        {cell.id.includes("uri") ? (
                          <DescriptionCell uri={cell.getValue() as string} />
                        ) : (
                          (cell.getValue() as string)
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {hasMoreT && (
          <div className="flex justify-center">
            <FetchMoreInspector fetchMore={fetchMore}>
              <Loading className="size-14" />
            </FetchMoreInspector>
          </div>
        )}
      </div>
    </div>
  );
}
