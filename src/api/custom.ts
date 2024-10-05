"use server";

import { httpBag } from "@/lib/http";
import { TCreateCustomProductRequest, TCustomResponse } from "@/schema/custom.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Lấy tất cả tài khoản
export const getAllCustoms = async (accessToken: string, params?: any) => {
  const response = await httpBag.get<TTableResponse<TCustomResponse>>(
    "/customization-option",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return response;
};

export const createCustomProduct = async (body: TCreateCustomProductRequest) => {
  const response = await httpBag.post<TCustomResponse>(
    "/product-customization/create",
    body
  );
  revalidateTag("custom");

  return response;
};