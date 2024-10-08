"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { TProductResponse } from "@/schema/product.schema";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { RowAction } from "./row-action";
import { statusProduct } from "./config";

export const columns: CustomColumnDef<TProductResponse>[] = [
  // "createdDate": "2024-09-30T20:01:40.773+00:00",
  //     "modifiedDate": "2024-09-30T13:01:40.773+00:00",
  //     "createdBy": null,
  //     "modifiedBy": null,
  //     "description": null,
  {
    accessorKey: "productName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên sản phẩm" />,
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("productName")}
        onClick={() => alert(row.getValue("productName"))} // Displays product name on click
      >
        {row.getValue("productName")}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
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
    enableColumnFilter: false,
  },

  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("stock")}</div>,
    enableSorting: true,
    enableColumnFilter: false,
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
        <div className="flex items-center space-x-2">
          <span
            className={`h-3 w-3 rounded-full ${
              status === "ACTIVE"
                ? "bg-green-500"
                : status === "CUSTOM"
                ? "bg-yellow-500" // Màu sắc cho trạng thái CUSTOM
                : "bg-red-500"
            }`}
          />
          <span className="max-w-[500px] truncate font-medium">
            {status === "ACTIVE"
              ? "Hoạt động"
              : status === "CUSTOM"
              ? "Tùy chỉnh" // Văn bản cho trạng thái CUSTOM
              : "Không hoạt động"}
          </span>
        </div>
      );
    },
    meta: {
      filterType: "select",
      options: statusProduct,
    },
    enableColumnFilter: false,
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
