"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateRange: FilterFn<Transaction>;
  }
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "post",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("post"));
      return date.toLocaleDateString();
    },
    filterFn: "dateRange",
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-right">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.original.category}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // const amount = parseFloat(row.original.amount);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount);
    },
  },
  // {
  //   accessorKey: "date",
  //   header: () => <div className="text-right">Transaction Date</div>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="text-right font-medium">
  //         {formatDate(row.original.date)}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

// function formatDate(date: Date) {
//   return date.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   });
// }
