"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { TProductResponse } from "@/schema/product.schema";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { RowAction } from "./row-action";

export const columns: CustomColumnDef<TProductResponse>[] = [
  // "createdDate": "2024-09-30T20:01:40.773+00:00",
  //     "modifiedDate": "2024-09-30T13:01:40.773+00:00",
  //     "createdBy": null,
  //     "modifiedBy": null,
  //     "description": null,
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("productName")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "img",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hình ảnh" />
    ),
    cell: ({ row }) => {
      const imgSrc = row.getValue("img") as string;
      return imgSrc ? (
        <img
          src={imgSrc}
          alt="Product Image"
          style={{ width: "100px", height: "auto" }}
        />
      ) : (
        "No Image"
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  },

  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("stock")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "finalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá cuối" />
    ),
    cell: ({ row }) => (
      <div className="">{formatPriceVND(row.getValue("finalPrice"))}</div>
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
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
  //   accessorKey: "modifiedDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Ngày chỉnh sửa" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">
  //       {formattedDateTime(row.getValue("modifiedDate")) || "Chưa chỉnh sửa"}
  //     </div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
  // {
  //   accessorKey: "createdBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Người tạo" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("createdBy") || "N/A"}</div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
  // {
  //   accessorKey: "modifiedBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Người chỉnh sửa" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("modifiedBy") || "N/A"}</div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
];
