"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { TVoucherResponse } from "@/schema/voucher.schema";

export const columns: ColumnDef<TVoucherResponse>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "deviceNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Device Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px]">{row.getValue("deviceNum")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "password",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Password" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px]">{row.getValue("password")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "upRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Up Rate" />
    ),
    cell: ({ row }) => <div className="w-[30px]">{row.getValue("upRate")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "downRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Down Rate" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px]">{row.getValue("downRate")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "endUseTimeStr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time Using" />
    ),
    cell: ({ row }) => <div>{row.getValue("endUseTimeStr")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
