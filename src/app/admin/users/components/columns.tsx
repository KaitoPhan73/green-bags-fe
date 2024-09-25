"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";

import { CustomColumnDef } from "@/types/Colunm";
import { TAccountResponse } from "@/schema/account.schema";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { formattedDate, formattedDateTime } from "@/lib/formatter";

export const columns: CustomColumnDef<TAccountResponse>[] = [

  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("username")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: true,
    meta: {
      filterType: "input",
    },
  },
  {
    accessorKey: "roleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vai trò" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("roleName")}</div>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("email")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: true,
    meta: {
      filterType: "input",
    },
  },
  
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px]">{formattedDateTime(row.getValue("createdDate"))}</div>
    ),
  },
  
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("status")}
          </span>
        </div>
      );
    },
    meta: {
      filterType: "select",
      options: [
        { label: "Hoạt động", value: "active" },
        { label: "không hoạt động", value: "no-active" },
      ],
    },

    enableColumnFilter: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
