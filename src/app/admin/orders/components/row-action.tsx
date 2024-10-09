"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "sonner";
import { TOrderResponse } from "@/schema/order.schema";
import { deleteBaseModel } from "@/api/base-model";
import { updateOrder } from "@/api/order";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const updatedOrder = await updateOrder({orderID: orderId, status: status});
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export function RowActionOrder<TData extends TOrderResponse>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const handleViewDetail = async () => {
    try {
      await updateOrderStatus(row.original.id, "COMPLETED");
      toast.success("Trạng thái đơn hàng đã được cập nhật thành 'COMPLETED'.");
      router.push(`/admin/orders`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBaseModel(row.original.id);
      toast("Xóa thành công", {
        description: `Bạn đã xóa đơn hàng với mã ${row.original.id}`,
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa đơn hàng.");
      console.error("Error deleting order:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="group" onClick={handleViewDetail}>
          Cập nhật đơn hàng
          <DropdownMenuShortcut>
            <span className="group-hover:hidden">
              <TbEyeClosed className=" h-4 w-4" />
            </span>
            <span className="hidden group-hover:inline">
              <FaEye className=" h-4 w-4 " />
            </span>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          {row.original.status === "ACTIVE" ? "Xóa" : "Đã xóa"}
          <DropdownMenuShortcut>
            <FaDeleteLeft className=" h-4 w-4 " />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
