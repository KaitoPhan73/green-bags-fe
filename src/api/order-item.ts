"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateOrderItemRequest,
  TUpdateOrderItemRequest,
  TOrderItemResponse,
} from "@/schema/order-item.schema";
import { TTableResponse } from "@/types/Table";

// Lấy tất cả Order Items
const getAllOrderItems = async (): Promise<
  TTableResponse<TOrderItemResponse>
> => {
  const response = await httpBag.get<TTableResponse<TOrderItemResponse>>(
    "/order-item"
  );
  return response.payload;
};

// Lấy Order Item theo ID
const getOrderItemById = async (id: string): Promise<TOrderItemResponse> => {
  const response = await httpBag.get<TOrderItemResponse>(`/order-item/${id}`);
  return response.payload;
};

// Tạo Order Item mới
const createOrderItem = async (
  body: TCreateOrderItemRequest
): Promise<TOrderItemResponse> => {
  const response = await httpBag.post<TOrderItemResponse>(
    "/order-item/create",
    body
  );
  return response.payload;
};

// Cập nhật Order Item
const updateOrderItem = async (
  id: string,
  body: TUpdateOrderItemRequest
): Promise<TOrderItemResponse> => {
  const response = await httpBag.patch<TOrderItemResponse>(
    `/order-item/${id}`,
    body
  );
  return response.payload;
};

// Xóa Order Item
const changeOrderItem = async (id: string): Promise<void> => {
  await httpBag.delete(`/order-item/delete/${id}`);
};

// Lấy tất cả Order Items đang hoạt động
const getAllOrderItemsActive = async (): Promise<
  TTableResponse<TOrderItemResponse>
> => {
  const response = await httpBag.get<TTableResponse<TOrderItemResponse>>(
    "/order-item/order-item-status-active"
  );
  return response.payload;
};

// Export các hàm API
export {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  changeOrderItem,
  getAllOrderItemsActive,
};
