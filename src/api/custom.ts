"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateCustomProductRequest,
  TCustomResponse,
} from "@/schema/custom.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Lấy tất cả tài khoản
export const getAllCustoms = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TCustomResponse>>(
    "/product-customization",
    {
      params,
      next: { tags: ["custom"] },
    }
  );
  return response;
};

export const getAllCustomsByUserId = async (userId: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TCustomResponse>>(
    `/product-customization/user/${userId}`,
    {
      params,
      next: { tags: ["custom"] },
    }
  );
  return response;
};

export const getAllCustomsById = async (id: string) => {
  const response = await httpBag.get<TCustomResponse>(
    `/product-customization/${id}`,
    {
      next: { tags: ["custom"] },
    }
  );
  return response;
};

export const createCustomProduct = async (
  body: TCreateCustomProductRequest
) => {
  const response = await httpBag.post<TCustomResponse>(
    "/product-customization/create",
    body
  );
  revalidateTag("custom");

  return response;
};
