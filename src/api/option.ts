"use server";

import { httpBag } from "@/lib/http";
import { TOptionResponse } from "@/schema/option.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

export const getAllOptions = async (params?: any) => {
  const response = await httpBag.get<TTableResponse<TOptionResponse>>(
    "/customization-option",
    {
      params,
      next: { tags: ["options"] },

    }
  );
  return response;
};