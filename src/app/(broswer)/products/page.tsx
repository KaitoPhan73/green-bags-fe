import React from "react";
import { TabTypeProducts } from "./_components/tabs";
import ListProducts from "./_components/list-products";
import { getAllProductsForUser } from "@/api/product";
import { getAllCategoriesActive } from "@/api/category";
import { revalidateTag } from "next/cache";
import ProductFilter from "./_components/product-filter";
const page = async (props: any) => {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 6,
    minPrice: props.searchParams.minPrice && props.searchParams.minPrice,
    maxPrice: props.searchParams.maxPrice && props.searchParams.maxPrice,
    name: props.searchParams.name && props.searchParams.name,
  };
  console.log("params", params);
  revalidateTag("products");
  revalidateTag("products-active");
  const productResponse = await getAllProductsForUser(params);
  console.log("productResponse", productResponse);
  // console.log("productResponse", productResponse.payload);
  return (
    <section className="flex flex-1 gap-8 mb-8">
      <div className="w-[20%]">
        <ProductFilter params={params} />
      </div>
      <div className="mt-14 flex-1 px-2">
        <ListProducts dataSource={productResponse.payload} params={params} />
      </div>
    </section>
  );
};

export default page;
