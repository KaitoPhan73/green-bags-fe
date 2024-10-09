"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TOrderResponse } from "@/schema/order.schema";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { RowActionOrder } from "./row-action";

export const columns: CustomColumnDef<TOrderResponse>[] = [
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
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <div className="w-36">
        {formattedDateTime(row.getValue("createdDate"))}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "modifiedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày chỉnh sửa" />
    ),
    cell: ({ row }) => (
      <div className="w-56">
        {formattedDateTime(row.getValue("modifiedDate")) || "Chưa chỉnh sửa"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thông tin chi tiết" />
    ),
    cell: ({ row }) => {
      const objectString = row.getValue("reason") as string;
      let reasonObject;

      if (typeof objectString === "string") {
        try {
          const decodedString = objectString
            .replace(/\\\\/g, "\\")
            .replace(/\\"/g, '"');

          reasonObject = JSON.parse(decodedString);
        } catch (error) {
          console.error("Invalid JSON string for reason:", objectString, error);
        }
      }

      return (
        <div style={{ textAlign: "left" }}>
          {reasonObject ? (
            <p>
              <strong>Name:</strong> {reasonObject.name}
              <br />
              <span style={{ fontStyle: "italic" }}>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${reasonObject.email}`}
                  style={{ color: "blue", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reasonObject.email}
                </a>
              </span>
              <br />
              <strong>Phone:</strong> {reasonObject.phone}
              <br />
              <strong>Address:</strong> {reasonObject.address}
            </p>
          ) : (
            "Không có thông tin!"
          )}
        </div>
      );
    },

    enableSorting: false,
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
    enableColumnFilter: true,
  },
  // {
  //   accessorKey: "modifiedBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Người chỉnh sửa" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("modifiedBy") ?? 'N/A' }</div>
  //   ),
  //   enableSorting: true,
  //   enableColumnFilter: true,
  // },
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
                ? "bg-green-500" // Green for "ACTIVE"
                : status === "INACTIVE"
                ? "bg-red-500" // Red for "INACTIVE"
                : "bg-blue-500" // Blue for "COMPLETED"
            }`}
          />
          <span className="max-w-[500px] truncate font-medium">
            {status === "ACTIVE"
              ? "Hoạt động"
              : status === "INACTIVE"
              ? "Không hoạt động"
              : "Đã hoàn thành"}
          </span>
        </div>
      );
    },
    meta: {
      filterType: "select",
      options: [
        { label: "Hoạt động", value: "ACTIVE" },
        { label: "Không hoạt động", value: "INACTIVE" },
        { label: "Đã hoàn thành", value: "COMPLETED" },
      ],
    },
    enableColumnFilter: true,
  },

  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đơn hàng" />
    ),
    cell: ({ row }) => (
      <div className="">{formattedDateTime(row.getValue("orderDate"))}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng số tiền" />
    ),
    cell: ({ row }) => (
      <div className="">{formatPriceVND(row.getValue("totalAmount"))}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "shippingAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ giao hàng" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("shippingAddress")}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowActionOrder row={row} />,
  },
];
