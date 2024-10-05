"use server";

import { DataTable } from "@/components/table/data-table";
import { columns } from "./_components/columns";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { getAllProducts } from "@/api/product";
import ProductIndex from "./_components";
import { getAllBaseModelsActive } from "@/api/base-model";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const [productResponse, baseModelResponse] = await Promise.all([
    getAllProducts(params),
    getAllBaseModelsActive(params) || [],
  ]);
  revalidateTag("products");
  revalidateTag("products-active");
  // console.log("hihihihihi:", baseModelResponse);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <ProductIndex
          columns={columns}
          payload={productResponse.payload}
          basemodel={baseModelResponse.payload}
          params={params}
        />
      </div>
    </>
  );
}
