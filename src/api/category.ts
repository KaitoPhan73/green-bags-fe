"use server";
import { httpBag } from "@/lib/http";
import {
  TCreateCategoryRequest,
  TUpdateCategoryRequest,
  TCategoryResponse,
} from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả Categories
const getAllCategories = async (params?: any) => {
  return await httpBag.get<TTableResponse<TCategoryResponse>>(`/category`, {
    params,
    next: { tags: ["categories"] },
  });
};

// Lấy tất cả Categories đang active
const getAllCategoriesActive = async (params?: any) => {
  return await httpBag.get<TTableResponse<TCategoryResponse>>(
    `/category/category-status-active`,
    {
      params,
      next: { tags: ["categories-active"] },
    }
  );
};

// Lấy Category theo ID
const getCategoryById = async (id: string) => {
  return await httpBag.get<TCategoryResponse>(`/category/${id}`, {
    next: { tags: ["categories"] },
  });
};

// Tạo mới Category
const createCategory = async (body: TCreateCategoryRequest) => {
  const result = await httpBag.post<TCategoryResponse>(
    "/category/create",
    body
  );
  revalidateTag("categories");
  revalidateTag("categories-active");
  return result;
};

// Cập nhật Category
const updateCategory = async (body: TUpdateCategoryRequest) => {
  const response = await httpBag.patch<TCategoryResponse>(
    `/category/update`,
    body
  );
  revalidateTag("categories");
  revalidateTag("categories-active");
  return response;
};

// Xóa Category
const deleteCategory = async (id: string): Promise<void> => {
  await httpBag.delete(`/category/delete/${id}`);
  revalidateTag("categories");
  revalidateTag("categories-active");
};

export {
  getAllCategories,
  getAllCategoriesActive,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
