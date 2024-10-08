import React from "react";
import { TabTypeProducts } from "./_components/tabs";
import ListProducts from "./_components/list-products";
import { getAllProducts, getAllProductsActive } from "@/api/product";
import { getAllCategoriesActive } from "@/api/category";
import { revalidateTag } from "next/cache";
const page = async (props: any) => {
  const typeList = [
    { label: "Túi đeo chéo", value: "123" },
    { label: "Túi hư có sẳn", value: "456" },
  ];
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  revalidateTag("products");
  revalidateTag("products-active");
  const product = getAllProductsActive(params);
  const category = getAllCategoriesActive({
    page: 1,
    limit: 1000,
  });

  const [productResponse, categoryResponse] = await Promise.all([
    product,
    category,
  ]);
  // console.log("productResponse", productResponse.payload);
  return (
    <div>
      <section className="pt-12 md:pt-24 lg:pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <TabTypeProducts categories={categoryResponse.payload} />
          </div>
          <div className="my-12">
            <ListProducts
              dataSource={productResponse.payload?.listResult}
              params={params}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
