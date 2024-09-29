import React from "react";
import { FormUpdateProduct } from "./components/form-update-product";
import { getProductById } from "@/api/product";

const UpdateProduct = async ({ params }: { params: { slug: string } }) => {
  const response = await getProductById(params.slug);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateProduct initialData={response.payload} />
      </div>
    </>
  );
};

export default UpdateProduct;
