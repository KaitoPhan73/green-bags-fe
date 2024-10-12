"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateProductRequest,
  TUpdateProductRequest,
  TProductResponse,
} from "@/schema/product.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

const getAllProducts = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TProductResponse>>(
    "/product",
    {
      params,
      next: { tags: ["products"] },
    }
  );
  return response;
};

const getProductById = async (id: string) => {
  return await httpBag.get<TProductResponse>(`/product/${id}`, {
    next: { tags: ["products"] },
  });
};

const getAllProductsActive = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TProductResponse>>(
    `/product/product-status-active`,
    {
      params,
      next: { tags: ["products-active"] },
    }
  );
  return response;
};

const getAllProductsForUser = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TProductResponse>>(
    `/product/for-user`,
    {
      params,
      next: { tags: ["products-active"] },
    }
  );
  return response;
};

const createProduct = async (body: TCreateProductRequest) => {
  const response = await httpBag.post<TProductResponse>(
    "/product/create",
    body
  );
  revalidateTag("products");

  return response;
};

// const getProduct = async (
//   id: string
// ): Promise<TTableResponse<TProductResponse>> => {
//   const response = await httpBag.get<TTableResponse<TProductResponse>>(
//     `/product/${id}`
//   );
//   return response.payload;
// };

// // Cập nhật sản phẩm
const updateProduct = async (body: TUpdateProductRequest) => {
  const response = await httpBag.patch<TProductResponse>(
    `/product/update`,
    body
  );
  revalidateTag("products");
  return response;
};

// // Xóa sản phẩm
// const deleteProduct = async (id: string): Promise<void> => {
//   await httpBag.delete(`/products/${id}`);
// };

// Export các hàm API
export {
  getAllProducts,
  getProductById,
  getAllProductsActive,
  createProduct,
  updateProduct,
  getAllProductsForUser,
  // deleteProduct,
  // getProduct,
};
