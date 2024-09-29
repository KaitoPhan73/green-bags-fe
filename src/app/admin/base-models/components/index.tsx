"use client";
import React from "react";
import { DataTable } from "@/components/table/data-table";
import { CustomColumnDef } from "@/types/Colunm";
import { TTableResponse } from "@/types/Table";
import { DialogCreateBaseModel } from "./dialog-create-base-model";
import { TCategoryResponse } from "@/schema/category.schema";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  payload: TTableResponse<TData>;
  params: {
    page: number;
    limit: number;
  };
  categories?: TTableResponse<TCategoryResponse>["listResult"];
}

const BaseModelIndex = <TData, TValue>({
  columns,
  payload,
  params,
  categories,
}: DataTableProps<TData, TValue>) => {
  return (
    <div>
      <div className="flex h-full flex-1 flex-col">
        {/* <CardReports data={response.payload} /> */}

        <div className="flex items-center justify-between">
          <p className="text-3xl">Quản Lí Mẫu</p>

          <DialogCreateBaseModel className="mb-3" categories={categories} />
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

export default BaseModelIndex;
