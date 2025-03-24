import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

import { Collection } from "@/types/token";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

type DataItem = {
  creator: Address;
  uri: string;
  released_date: string;
};
const columnHelper = createColumnHelper<DataItem>();

const columns = [
  columnHelper.accessor("creator", {
    header: "Artist",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("uri", {
    header: "URI",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("released_date", {
    header: "Released At",
    cell: (info) => info.getValue(),
  }),
];

export default function useFeedTable(feeds: Collection[]) {
  const [tableData, setTableData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (feeds.length)
      setTableData(
        feeds.map((feed: Collection) => ({
          creator: feed.creator,
          released_date: new Date(feed.released_at)
            .toLocaleString()
            .toLowerCase(),
          uri: getFetchableUrl(feed.contractURI) as string,
        })),
      );
  }, [feeds]);

  return useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: tableData.length,
      },
    },
  });
}
