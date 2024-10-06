import { httpBag } from "@/lib/http";
import { TProductResponse } from "@/schema/product.schema";
import { TTableResponse } from "@/types/Table";
import React from "react";

const productApi = {
  getProducts: async (params?: any) => {
    const response = await httpBag.get<TTableResponse<TProductResponse>>(
      `/product`,
      {
        params,
      }
    );
    console.log("response", response.payload.listResult);
    return response.payload.listResult;
  },
};

export { productApi };
