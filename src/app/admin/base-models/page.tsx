"use server";

import { columns } from "./components/columns";

import { getAllBaseModels } from "@/api/base-model";
import BaseModelIndex from "./components";
import { getAllCategoriesActive } from "@/api/category";
import { revalidateTag } from "next/cache";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const baseModel = getAllBaseModels(params);
  const category = getAllCategoriesActive({
    page: 1,
    limit: 1000,
  });
  revalidateTag("base-models");
  revalidateTag("base-models-active");
  const [baseModelresponse, categoryResponse] = await Promise.all([
    baseModel,
    category,
  ]);

  return (
    <>
      <BaseModelIndex
        columns={columns}
        payload={baseModelresponse.payload}
        params={params}
        categories={categoryResponse.payload.listResult}
      />
    </>
  );
}
