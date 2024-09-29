import React from "react";
import { FormCreateProduct } from "../components/form-create-product";
import { getAllCategories } from "@/api/category";
const CreateCategory = async (props: any) => {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };
  const next = {
    tags: ["category"],
  };
  const response = await getAllCategories(params);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormCreateProduct 
        payload={response.payload}
        params={params}
        />
      </div>
    </>
  );
};

export default CreateCategory;
