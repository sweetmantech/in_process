import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

import { Collection, Token } from "@/types/token";
import { Address } from "viem";
import { useEffect, useState } from "react";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";

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

export default function useFeedTable() {
  const { feeds } = useInProcessFeedProvider();
  const [tableData, setTableData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (feeds.length)
      setTableData(
        feeds.map((feed: Token) => ({
          creator: feed.creator,
          released_date: new Date(feed.created_at)
            .toLocaleString()
            .toLowerCase(),
          uri: getFetchableUrl(feed.uri) as string,
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
