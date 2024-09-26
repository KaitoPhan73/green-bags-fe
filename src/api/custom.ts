"use server";

import { httpBag } from "@/lib/http";
import { TCustomResponse } from "@/schema/custom.schema";
import { TTableResponse } from "@/types/Table";

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