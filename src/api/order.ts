"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateOrderRequest,
  TUpdateOrderRequest,
  TOrderResponse,
} from "@/schema/order.schema";
import { TTableResponse } from "@/types/Table";


const getAllOrders = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TOrderResponse>>(
    "/order",
    {
      params,
    }
  );
  return response;
};

// Lấy đơn hàng theo ID
const getOrderById = async (id: string): Promise<TOrderResponse> => {
  const response = await httpBag.get<TOrderResponse>(`/order/${id}`);
  return response.payload;
};

// Tạo đơn hàng mới
const createOrder = async (
  body: TCreateOrderRequest
): Promise<TOrderResponse> => {
  const response = await httpBag.post<TOrderResponse>("/order", body);
  return response.payload;
};

// Cập nhật đơn hàng
const updateOrder = async (
  id: string,
  body: TUpdateOrderRequest
): Promise<TOrderResponse> => {
  const response = await httpBag.put<TOrderResponse>(`/orders/${id}`, body);
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
};
