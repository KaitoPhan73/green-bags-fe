"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { TProductResponse } from "@/schema/product.schema";
import { formattedDateTime } from "@/lib/formatter";
import { RowAction } from "./row-action";

export const columns: CustomColumnDef<TProductResponse>[] = [
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="">{formattedDateTime(row.getValue("createdDate"))}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "modifiedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày chỉnh sửa" />
    ),
    cell: ({ row }) => (
      <div className="">
        {formattedDateTime(row.getValue("modifiedDate")) || "Chưa chỉnh sửa"}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người tạo" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("createdBy") || "N/A"}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "modifiedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người chỉnh sửa" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("modifiedBy") || "N/A"}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex space-x-2">
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
  //   accessorKey: "baseModelID",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Base Model ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("baseModelID")}</div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
  {
    accessorKey: "finalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá cuối" />
    ),
    cell: ({ row }) => (
      <div className="">{formattedDateTime(row.getValue("finalPrice"))}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
