"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateOrderRequest,
  TUpdateOrderRequest,
  TOrderResponse,
} from "@/schema/order.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

const getAllOrders = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TOrderResponse>>("/order", {
    params,
  });
  return response;
};

// Lấy đơn hàng theo ID
const getOrderById = async (id: string) => {
  const response = await httpBag.get<TOrderResponse>(`/order/${id}`);
  return response;
};

const getOrdersByUserId = async (userId: string, param?: any) => {
  const response = await httpBag.get<TTableResponse<TOrderResponse>>(
    `/order/user/${userId}`,
    {
      params: param,
    }
  );
  return response;
};

// Tạo đơn hàng mới
const createOrder = async (body: TCreateOrderRequest) => {
  const response = await httpBag.post<TOrderResponse>("/order/create", body);
  return response;
};

// Cập nhật đơn hàng
const updateOrder = async (
  body: any,
) => {
  const response = await httpBag.patch<TOrderResponse>(`/order/update`, body);
  revalidateTag("orders");

  return response.payload;
};

// Xóa đơn hàng
const deleteOrder = async (id: string): Promise<void> => {
  await httpBag.delete(`/order/change-status/${id}`);
};

// Lấy tất cả đơn hàng đang hoạt động
const getAllOrdersActive = async (): Promise<
  TTableResponse<TOrderResponse>
> => {
  const response = await httpBag.get<TTableResponse<TOrderResponse>>(
    "/order/order-status-active"
  );
  return response.payload;
};

// Export các hàm API
export {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersActive,
  getOrdersByUserId,
};
