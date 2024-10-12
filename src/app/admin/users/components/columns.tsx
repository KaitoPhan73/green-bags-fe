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
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("roleName")}</div>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("email")}</div>,
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
      <div className="w-[50px]">
        {formattedDateTime(row.getValue("createdDate"))}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center space-x-2">
          {/* Green dot for 'Hoạt động', red dot for 'Không hoạt động' */}
          <span
            className={`h-3 w-3 rounded-full ${
              status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="max-w-[500px] truncate font-medium">
            {status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
          </span>
        </div>
      );
    },
    meta: {
      filterType: "select",
      options: [
        { label: "Hoạt động", value: "ACTIVE" },
        { label: "Không hoạt động", value: "INACTIVE" },
      ],
    },
    enableColumnFilter: true,
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
