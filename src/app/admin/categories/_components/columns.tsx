"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TProductResponse } from "@/schema/product.schema";
import { formattedDateTime } from "@/lib/formatter";
import { TCategoryResponse } from "@/schema/category.schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowAction } from "./row-action";
export const columns: CustomColumnDef<TCategoryResponse>[] = [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("categoryName") || "Chưa có tên"}</div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => (
      <div className="truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{row.getValue("description")}</TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("description")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="">{formattedDateTime(row.getValue("createdDate"))}</div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
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
    enableColumnFilter: false,
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
    enableColumnFilter: false,
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
    enableColumnFilter: false,
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
    enableColumnFilter: false,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
