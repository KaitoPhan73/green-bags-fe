"use server";

import { httpBag } from "@/lib/http";
import { TReviewResponse, TCreateReviewRequest } from "@/schema/review.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả Review
const getAllReview = async () => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    "/review",
    {
      next: { tags: ["reviews"] },
    }
  );
  return response.payload;
};

// Lấy Review theo ID
const getReviewById = async (id: string) => {
  const response = await httpBag.get<TReviewResponse>(`/review/${id}`, {
    next: { tags: ["reviews"] },
  });
  return response.payload;
};

// Tạo Review mới
const createReview = async (body: TCreateReviewRequest, token: string) => {
  const response = await httpBag.post<TReviewResponse>("/review/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidateTag("reviews");
  revalidateTag("reviews-active");
  return response;
};

// Lấy Review theo Product ID
const getAllReviewByProductId = async (productId: string) => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    `/review/product/${productId}`,
    {
      next: { tags: ["reviews"] },
    }
  );
  return response;
};

// Cập nhật trạng thái Review
const updateReviewStatus = async (id: string, status: string) => {
  const response = await httpBag.patch<TReviewResponse>(`/review/${id}`, {
    status,
  });
  revalidateTag("reviews");
  revalidateTag("reviews-active");
  return response;
};

// Xóa Review
const deleteReview = async (id: string): Promise<void> => {
  await httpBag.delete(`/review/${id}`);
  revalidateTag("reviews");
  revalidateTag("reviews-active");
};

// Lấy tất cả Review đang hoạt động
const getAllReviewActive = async (): Promise<
  TTableResponse<TReviewResponse>
> => {
  const response = await httpBag.get<TTableResponse<TReviewResponse>>(
    "/review/review-status-active",
    {
      next: { tags: ["reviews-active"] },
    }
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
