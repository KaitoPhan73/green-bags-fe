"use server";
import { httpBag } from "@/lib/http";
import {
  TCreateCategoryRequest,
  TUpdateCategoryRequest,
  TCategoryResponse,
} from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
import next from "next";
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
    `/category/active`,
    {
      params,
    }
  );
};

// Lấy Category theo ID
const getCategoryById = async (id: string) => {
  return await httpBag.get<TCategoryResponse>(`/category/${id}`);
};

// Tạo mới Category
const createCategory = async (body: TCreateCategoryRequest) => {
  const result = await httpBag.post<TCategoryResponse>("/category", body);
  revalidateTag("category");
  return result;
};

export const clickChoi = async () => {
  revalidateTag("categories");
};

// Cập nhật Category
const updateCategory = async (body: TUpdateCategoryRequest) => {
  return await httpBag.patch<TCategoryResponse>(`/category`, body);
};

// Xóa Category
const deleteCategory = async (id: string): Promise<void> => {
  await httpBag.delete(`/category/${id}`);
};

export {
  getAllCategories,
  getAllCategoriesActive,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
