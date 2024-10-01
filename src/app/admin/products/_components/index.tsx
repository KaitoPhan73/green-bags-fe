"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { CustomColumnDef } from "@/types/Colunm";
import { TTableResponse } from "@/types/Table";
import { useRouter } from "next/navigation";
import { getAllCategories } from "@/api/category";
import { TCategoryResponse } from "@/schema/category.schema";
import { TBaseModelResponse } from "@/schema/base-model.schema";
import { FormCreateProduct } from "./form-create-product";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  payload: TTableResponse<TData>;
  params: {
    page: number;
    limit: number;
  };
  basemodel: TTableResponse<TBaseModelResponse>["listResult"];
}

const ProductIndex = <TData, TValue>({
  columns,
  payload,
  params,
  basemodel,
}: DataTableProps<TData, TValue>) => {
  return (
    <div>
      <div className="flex h-full flex-1 flex-col">
        {/* <CardReports data={response.payload} /> */}

        <div className="flex items-center justify-between">
          <p className="text-3xl">Quản Lí Sản Phẩm</p>

          <FormCreateProduct basemodel={basemodel} />
        </div>
        <DataTable
          payload={{
            ...payload,
            page: params.page,
            limit: params.limit,
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ProductIndex;
