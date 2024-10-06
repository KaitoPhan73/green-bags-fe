"use server";

import { httpBag } from "@/lib/http";
import {
  TCreateCustomProductRequest,
  TCustomResponse,
  TUpdateCustomProductRequest,
} from "@/schema/custom.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

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

export const getCustomsById = async (id: string) => {
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
  revalidateTag("customs");

  return response;
};

export const getCustomProductById = async (id: string) => {
  return await httpBag.get<TCustomResponse>(`/product-customization/${id}`, {
    next: { tags: ["customs"] },
  });
};

export const updateCustomProduct = async (
  body: TUpdateCustomProductRequest
) => {
  const result = await httpBag.patch<TCustomResponse>(
    "/product-customization/update",
    body
  );
  revalidateTag("customs");
  return result;
};

export const updateCustomProductStatus = async (body: any) => {
  const result = await httpBag.patch<TCustomResponse>(
    "/product-customization/update",
    body
  );
  revalidateTag("customs");
  return result;
};
