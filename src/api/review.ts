"use server";

import { httpBag } from "@/lib/http";
import { TReviewResponse, TCreateReviewRequest } from "@/schema/review.schema";
import { TTableResponse } from "@/types/Table";

// Lấy tất cả Review
const getAllReview = async (): Promise<TTableResponse<TReviewResponse>> => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    "/review"
  );
  return response.payload;
};

// Lấy Review theo ID
const getReviewById = async (id: string): Promise<TReviewResponse> => {
  const response = await httpBag.get<TReviewResponse>(`/review/${id}`);
  return response.payload;
};

// Tạo Review mới
const createReview = async (
  body: TCreateReviewRequest
): Promise<TReviewResponse> => {
  const response = await httpBag.post<TReviewResponse>("/review", body);
  return response.payload;
};

// Lấy Review theo Product ID
const getAllReviewByProductId = async (
  productId: string
): Promise<TTableResponse<TReviewResponse>> => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    `/review/product/${productId}`
  );
  return response.payload;
};

// Cập nhật trạng thái Review
const updateReviewStatus = async (
  id: string,
  status: string
): Promise<TReviewResponse> => {
  const response = await httpBag.patch<TReviewResponse>(`/review/${id}`, {
    status,
  });
  return response.payload;
};

// Xóa Review
const deleteReview = async (id: string): Promise<void> => {
  await httpBag.delete(`/review/${id}`);
};

// Lấy tất cả Review đang hoạt động
const getAllReviewActive = async (): Promise<
  TTableResponse<TReviewResponse>
> => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    "/review/review-status-active"
  );
  return response.payload;
};

// Export các hàm API
export {
  getAllReview,
  getReviewById,
  createReview,
  getAllReviewByProductId,
  updateReviewStatus,
  deleteReview,
  getAllReviewActive,
};
