"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { TBaseModelResponse } from "@/schema/base-model.schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RowActionBaseModel } from "./row-action";
import { Badge } from "@/components/ui/badge";
export const columns: CustomColumnDef<TBaseModelResponse>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[80px]">{row.getValue("id")}</div>
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   enableColumnFilter: true,
  // },

  {
    accessorKey: "modelName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("modelName") || "Chưa có tên"}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => (
      <div className="">
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
    enableColumnFilter: true,
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => (
      <div className="">
        {formatPriceVND(row.getValue("basePrice") || "Chưa có giá")}
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
      <div className="">
        {formattedDateTime(row.getValue("createdDate")) || "N/A"}
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
        <div className="flex items-center space-x-2">
          {/* Green dot for 'Hoạt động', red dot for 'Không hoạt động' */}
          <span
            className={`h-3 w-3 rounded-full ${
              status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="max-w-[500px] truncate font-medium">
            {status === "ACTIVE" ? (
              <Badge
                variant="outline"
                className="p-1"
              >
                Hoạt động
              </Badge>
            ) : (
              <Badge variant="destructive" className="p-1">
                Không hoạt động
              </Badge>
            )}
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
  // {
  //   accessorKey: "finalPrice",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Giá cuối" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">{formattedDateTime(row.getValue("finalPrice"))}</div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowActionBaseModel row={row} />,
  },
];
