"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Collection } from "@/types/token";
import useFeedTable from "@/hooks/useFeedTable";
import { useRouter } from "next/navigation";
import EnsName from "../EnsName";
import { Address } from "viem";
import DescriptionCell from "./DescriptionCell";

interface FeedTableProps {
  feeds: Collection[];
}

export default function FeedTable({ feeds }: FeedTableProps) {
  const table = useFeedTable(feeds);
  const { push } = useRouter();
  const fontFamilies = [
    "font-archivo",
    "font-spectral-italic",
    "font-spectral-italic",
    "font-archivo",
  ];
  const fontSizes = ["text-xl", "text-lg", "text-lg", "text-md"];
  return (
    <div className="w-full">
      <div className="rounded-md overflow-auto max-h-[88vh] no-scrollbar">
        <Table>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="!border-none">
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    className={`py-3 border-none ${fontFamilies[i]} ${fontSizes[i]}`}
                  >
                    <button
                      onClick={() => {
                        if (cell.id.includes("creator"))
                          push(`/${cell.getValue()}`);
                      }}
                      type="button"
                    >
                      {cell.id.includes("creator") ? (
                        <EnsName
                          address={cell.getValue() as Address}
                          className="!text-xl !font-archivo-medium"
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
                    </button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
