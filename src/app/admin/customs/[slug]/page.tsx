import React from "react";
import { getAllCategoriesActive } from "@/api/category";
import { FormUpdateCustomProduct } from "./components/form-update-custom-product";
import { getCustomProductById } from "@/api/custom";
import { getAllProductsActive } from "@/api/product";
import { getAllAccountsActive } from "@/api/account";
import { getAllOptions } from "@/api/option";

const UpdateCustomProduct = async ({ params }: { params: { slug: string } }) => {
  const customProduct = getCustomProductById(params.slug);
  const option = getAllOptions({ page: 1, limit: 1000 });
  const product = getAllProductsActive({ page: 1, limit: 1000 });
  // const user = getAllAccountsActive(accessToken!, params);

  const [customProductResponse, optionResponse, productResponse] = await Promise.all([
    customProduct,
    option,
    product,
  ]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateCustomProduct
          initialData={customProductResponse.payload}
          options={optionResponse.payload.listResult}
          product={productResponse.payload.listResult}
        />
      </div>
    </>
  );
};

export default UpdateCustomProduct;
