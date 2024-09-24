"use server";

import { httpBag } from "@/lib/http";
import { TTableResponse } from "@/types/Table";

export const getProducts = async (params?: any) => {
  return httpBag.get<TTableResponse<any>>("/product", { params });
};
 