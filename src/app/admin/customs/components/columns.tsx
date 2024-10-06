"use client";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";
import { TCustomResponse } from "@/schema/custom.schema";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"; // Import Shadcn UI Dialog components
import { useState } from "react";
import { RowAction } from "./row-action";

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
    enableSorting: false,
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
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "modifiedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người chỉnh sửa" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("modifiedBy") ?? "N/A"}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
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
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "customValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Các Ảnh Phụ" />
    ),
    cell: ({ row }) => {
      // Lấy giá trị customValue từ row
      const customValueStr = row.getValue("customValue") as string;
  
      // Log giá trị của customValue trước khi parse
      console.log("Original customValue string:", customValueStr);
  
      let imageUrls: string[] = [];
  
      if (typeof customValueStr === "string") {
        try {
          // Lần đầu tiên JSON.parse để loại bỏ ký tự escape và lấy chuỗi JSON hợp lệ
          const decodedString = customValueStr.replace(/\\\\/g, '\\').replace(/\\"/g, '"');
          
          // Chuyển đổi chuỗi đã được giải mã thành mảng URL
          imageUrls = JSON.parse(decodedString);
          console.log("Final imageUrls array:", imageUrls);
        } catch (error) {
          console.error("Invalid JSON string for customValue:", customValueStr, error);
        }
      }
  
      // Nếu imageUrls là mảng các URL, hiển thị các ảnh
      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-blue-500 underline">
                Detail ({imageUrls.length} ảnh)
              </button>
            </DialogTrigger>
            <DialogContent>
              <div className="grid grid-cols-2 gap-4">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                ))}
              </div>
              <DialogClose asChild>
                <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300">
                  Close
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        );
      } else {
        return "No Images";
      }
    },
    enableSorting: false,
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
          {/* Colored dots based on status */}
          <span
            className={`h-3 w-3 rounded-full ${
              status === "ACCEPTED"
                ? "bg-green-500"
                : status === "COMPLETED"
                ? "bg-blue-500"
                : status === "PROCESSING"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          <span className="max-w-[500px] truncate font-medium">
            {status === "ACCEPTED"
              ? "Đã Duyệt"
              : status === "COMPLETED"
              ? "Hoàn Tất"
              : status === "PROCESSING"
              ? "Đang Xử Lý"
              : "Đã Hủy"}
          </span>
        </div>
      );
    },
    meta: {
      filterType: "select",
      options: [
        { label: "Đang Xử Lý", value: "PROCESSING" },
        { label: "Đã Hủy", value: "CANCELLED" },
        { label: "Đã Duyệt", value: "ACCEPTED" },
        { label: "Hoàn Tất", value: "COMPLETED" },
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
