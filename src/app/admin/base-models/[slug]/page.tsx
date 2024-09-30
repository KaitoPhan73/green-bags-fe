import React from "react";
import { FormUpdateBaseModel } from "./components/form-update-base-model";
import { getBaseModelById } from "@/api/base-model";
import { getAllCategoriesActive } from "@/api/category";

const UpdateBaseModel = async ({ params }: { params: { slug: string } }) => {
  const baseModel = getBaseModelById(params.slug);
  const category = getAllCategoriesActive({ page: 1, limit: 1000 });
  const [baseModelResponse, categoryResponse] = await Promise.all([
    baseModel,
    category,
  ]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateBaseModel
          initialData={baseModelResponse.payload}
          categories={categoryResponse.payload.listResult}
        />
      </div>
    </>
  );
};

export default UpdateBaseModel;
