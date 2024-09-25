"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateProductRequest,
  TUpdateProductRequest,
  TProductResponse,
} from "@/schema/product.schema";
import { TTableResponse } from "@/types/Table";

const getAllProducts = async (accessToken: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TProductResponse>>(
    "/product",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return response;
};

// const getAllProductsActive = async (
//   params?: any
// ): Promise<TTableResponse<TProductResponse>> => {
//   const response = await httpBag.get<TTableResponse<TProductResponse>>(
//     `/product/product-status-active`,
//     {
//       params: params,
//     }
//   );
//   return response.payload;
// };

// const getProduct = async (
//   id: string
// ): Promise<TTableResponse<TProductResponse>> => {
//   const response = await httpBag.get<TTableResponse<TProductResponse>>(
//     `/product/${id}`
//   );
//   return response.payload;
// };
// const createProduct = async (
//   body: TCreateProductRequest
// ): Promise<TProductResponse> => {
//   const response = await httpBag.post<TProductResponse>("/product", body);
//   return response.payload;
// };

// // Cập nhật sản phẩm
// const updateProduct = async (id: string, body: TUpdateProductRequest) => {
//   const response = await httpBag.patch<TProductResponse>(
//     `/products/${id}`,
//     body
//   );
//   return response.payload;
// };

// // Xóa sản phẩm
// const deleteProduct = async (id: string): Promise<void> => {
//   await httpBag.delete(`/products/${id}`);
// };

// Export các hàm API
export {
  getAllProducts,
  // getAllProductsActive,
  // createProduct,
  // updateProduct,
  // deleteProduct,
  // getProduct,
};
