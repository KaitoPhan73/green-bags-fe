"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { TCustomResponse } from "@/schema/custom.schema";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import Shadcn UI Dialog components
import { useState } from "react";

export const columns: CustomColumnDef<TCustomResponse>[] = [
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
      <div className="">{row.getValue("modifiedBy") ?? "N/A"}</div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "imageURL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh Tổng" />
    ),
    cell: ({ row }) => {
      const imgSrc = row.getValue("imageURL") as string;

      return imgSrc ? (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <img
                src={imgSrc}
                alt="Product Image"
                style={{ width: "100px", height: "auto", cursor: "pointer" }}
              />
            </DialogTrigger>
            <DialogContent>
              <div style={{ textAlign: "center" }}>
                <img
                  src={imgSrc}
                  alt="Product Image"
                  style={{ maxWidth: "95%", maxHeight: "95vh" }}
                />
                <DialogClose asChild>
                  {/* <button style={{ marginTop: "10px" }}>Close</button> */}
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        "No Image"
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "customValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Các Ảnh Phụ" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("customValue") || "N/A"}</div>
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
            {status === "ACTIVE" ? "Đã Duyệt" : "Chưa Duyệt"}
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
