import { httpBag } from "@/lib/http";
import {
  TCreateCategoryRequest,
  TUpdateCategoryRequest,
  TCategoryResponse,
} from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";

// Lấy tất cả Categories
const getAllCategories = async (params?: any) => {
  return await httpBag.get<TTableResponse<TCategoryResponse>>(`/category`, {
    params,
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
  return await httpBag.post<TCategoryResponse>("/category", body);
};

// Cập nhật Category
const updateCategory = async (id: string, body: TUpdateCategoryRequest) => {
  return await httpBag.patch<TCategoryResponse>(`/category/${id}`, body);
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
