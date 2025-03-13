"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@prisma/client";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "postDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {formatDate(row.original.post)}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-right">Description</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("description")}
        </div>
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
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  //   {
  //     accessorKey: "date",
  //     header: () => <div className="text-right">Transaction Date</div>,
  //     cell: ({ row }) => {
  //       return (
  //         <div className="text-right font-medium">
  //           {formatDate(row.original.date)}
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "type",
    header: () => <div className="text-right">Type</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original.type}</div>;
    },
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
